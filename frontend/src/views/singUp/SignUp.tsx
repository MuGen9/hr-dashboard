import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { appRoutes } from 'routes/routes';

import api from '../../api/api';

import * as styles from './SignUp.styles';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat?: string;
}

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    setError('');
    const { passwordRepeat, ...dataWithoutPasswordRepeat } = data;
    api
      .post('/auth/register', dataWithoutPasswordRepeat)
      .then(res => {
        console.log('then', res);
        navigate(appRoutes.signIn);
      })
      .catch(err => {
        console.log('catch', err.response.data);
        setError(err.response.data.message);
      });
  };

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
    <HelmetProvider>
      <Helmet>
        <title>HR Dashboard - Sign Up</title>
      </Helmet>
      <Box sx={styles.box}>
        <Paper elevation={5} sx={styles.paper}>
          <Typography variant="h1" sx={styles.typography}>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1.5} sx={styles.stack}>
              <TextField
                label="First name *"
                variant="standard"
                sx={{ width: { xs: '230px', sm: '320px' } }}
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
                sx={{ width: { xs: '230px', sm: '320px' } }}
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
                sx={{ width: { xs: '230px', sm: '320px' } }}
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
                sx={{ width: { xs: '230px', sm: '320px' } }}
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
                sx={{ width: { xs: '230px', sm: '320px' } }}
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
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                variant="contained"
                sx={{ fontSize: '1rem', p: 1.5 }}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account? Then{' '}
            <Link href={appRoutes.signIn}>Sign In</Link>
          </Typography>
        </Paper>
      </Box>
    </HelmetProvider>
  );
};

export default SignUp;
