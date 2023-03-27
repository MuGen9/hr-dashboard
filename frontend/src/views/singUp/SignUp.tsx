import {
  Link,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';

import { appRoutes } from 'routes/routes';

import { registerRequest } from '../../api/api';

import { registerSchema, SignUpForm } from './register.schema';
import * as styles from './SignUp.styles';

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur'
  });

  const {
    mutate,
    isLoading,
    error: mutateError
  } = useMutation(registerRequest, {
    onSuccess: () => {
      navigate(appRoutes.signIn);
    }
  });

  const onSubmit: SubmitHandler<SignUpForm> = userData => {
    const { passwordRepeat, ...dataWithoutPasswordRepeat } = userData;
    mutate(dataWithoutPasswordRepeat);
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
              <>
                <TextField
                  label="First name *"
                  variant="standard"
                  sx={{ width: { xs: '230px', sm: '320px' } }}
                  {...register('firstName')}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  label="Last name *"
                  variant="standard"
                  sx={{ width: { xs: '230px', sm: '320px' } }}
                  {...register('lastName')}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
                <TextField
                  label="Email *"
                  variant="standard"
                  sx={{ width: { xs: '230px', sm: '320px' } }}
                  {...register('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password *"
                  variant="standard"
                  type="password"
                  sx={{ width: { xs: '230px', sm: '320px' } }}
                  {...register('password')}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
                <TextField
                  label="Repeat Password *"
                  variant="standard"
                  type="password"
                  sx={{ width: { xs: '230px', sm: '320px' } }}
                  {...register('passwordRepeat')}
                  error={Boolean(errors.passwordRepeat)}
                  helperText={errors.passwordRepeat?.message}
                />
                {mutateError.response?.data?.message && (
                  <Alert severity="error">
                    {mutateError.response.data.message}
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ fontSize: '1rem', p: 1.5 }}
                >
                  Sign Up
                </Button>
                {isLoading && <CircularProgress />}
              </>
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
