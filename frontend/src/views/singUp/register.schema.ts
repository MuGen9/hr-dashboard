import { z } from 'zod';

const ShortStringConstraint = z
  .string()
  .min(3, { message: 'Please use at least 3 characters' })
  .max(15, { message: 'Please use less than 15 characters' });

const LongStringConstraint = z
  .string()
  .min(5, { message: 'At least 5 characters' })
  .max(15, { message: 'Please use less than 15 characters' });

export const registerSchema = z
  .object({
    firstName: ShortStringConstraint,
    lastName: ShortStringConstraint,
    email: z.string().email('Please use a valid e-mail address'),
    password: LongStringConstraint,
    passwordRepeat: LongStringConstraint
  })
  .refine(d => d.password === d.passwordRepeat, {
    message: 'Passwords do not match',
    path: ['passwordRepeat']
  });

export type SignUpForm = z.infer<typeof registerSchema>;
export type SignUpRequestPayload = Omit<SignUpForm, 'passwordRepeat'>;
