import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please use a valid e-mail address'),
  password: z
    .string()
    .min(5, { message: 'At least 5 characters' })
    .max(15, { message: 'Please use less than 15 characters' }),
  remember: z.boolean()
});

export type LogInForm = z.infer<typeof loginSchema>;
export type LogInRequestPayload = Omit<LogInForm, 'remember'>;

export type LogInResponse = {
  accessToken: string;
  refreshToken: string;
};
