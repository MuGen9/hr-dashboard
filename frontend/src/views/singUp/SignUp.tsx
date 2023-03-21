import { useEffect, useState } from 'react';
import {
  Link,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import { appRoutes } from 'routes/routes';

import api from '../../api/api';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat?: string;
}

const SignUp = () => {
  const [apiResponse, setApiResponse] = useState('');

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    setApiResponse('');
    const newData = { ...data };
    delete newData.passwordRepeat;
    api
      .post('/auth/register', newData)
      .then(response => console.log('then', response))
      .catch(error => {
        console.log('catch', error.response.data);
        setApiResponse(error.response.data.message);
      });
  };

  useEffect(() => {
    document.title = 'HR Dashboard - Sign Up';
  }, []);

  const required = {
    value: true,
    message: 'This field cannot be empty'
  };
  const minLength = {
    value: 3,
    message: 'Please use at least 3 characters'
  };
  const maxLength = {
    value: 15,
    message: 'Please use less than 15 characters'
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ minHeight: '100vh' }}
    >
      <Paper
        elevation={5}
        sx={{ p: 2, display: { xs: 'contents', sm: 'block', width: '400px' } }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: '2rem',
            fontWeight: 'medium',
            margin: '1rem',
            wordBreak: 'break-all'
          }}
        >
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            spacing={1.5}
          >
            <TextField
              label="First name *"
              variant="standard"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('firstName', {
                required,
                minLength,
                maxLength
              })}
              error={Boolean(errors.firstName)}
              helperText={errors?.firstName?.message}
            />
            <TextField
              label="Last name *"
              variant="standard"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('lastName', {
                required,
                minLength,
                maxLength
              })}
              error={Boolean(errors.lastName)}
              helperText={errors?.lastName?.message}
            />
            <TextField
              label="Email *"
              variant="standard"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('email', {
                required,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please use a valid e-mail address'
                }
              })}
              error={Boolean(errors.email)}
              helperText={errors?.email?.message}
            />
            <TextField
              label="Password *"
              variant="standard"
              type="password"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('password', {
                required,
                minLength: {
                  value: 5,
                  message: 'Please use at least 5 characters'
                },
                maxLength: {
                  value: 15,
                  message: 'Please use less than 15 characters'
                }
              })}
              error={Boolean(errors.password)}
              helperText={errors?.password?.message}
            />
            <TextField
              label="Repeat Password *"
              variant="standard"
              type="password"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('passwordRepeat', {
                required,
                validate: value =>
                  value === watch('password') || 'The passwords do not match',
                minLength: {
                  value: 5,
                  message: 'Please use at least 5 characters'
                },
                maxLength: {
                  value: 15,
                  message: 'Please use less than 15 characters'
                }
              })}
              error={Boolean(errors.passwordRepeat)}
              helperText={errors?.passwordRepeat?.message}
            />
            {apiResponse && <Alert severity="error">{apiResponse}</Alert>}
            <Button
              type="submit"
              variant="contained"
              sx={{ fontSize: '1rem', p: 1.5 }}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Typography sx={{ mt: 2 }}>
            Already have an account? Then{' '}
            <Link href={appRoutes.signIn}>Sign In</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignUp;
