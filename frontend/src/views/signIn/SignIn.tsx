import {
  Link,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

import { appRoutes } from 'utils/routes';

import { logInRequest } from '../../utils/api';
import * as styles from '../singUp/SignUp.styles';

import { loginSchema, LogInForm, LogInRequestPayload } from './login.schema';

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<LogInForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  });

  const {
    mutate,
    isLoading,
    error: mutateError
  } = useMutation<string, AxiosError<{ message: string }>, LogInRequestPayload>(
    logInRequest,
    {
      onSuccess: accessToken => {
        const rememberCheckbox = getValues('remember');
        // save token to local or session storage
        // tokenStorage.saveAccessToken({
        //   remember: rememberCheckbox,
        //   token: accessToken
        // });
        console.log('onSuccess', accessToken, rememberCheckbox);
        if (rememberCheckbox) {
          sessionStorage.removeItem('accessToken');
          localStorage.setItem('accessToken', accessToken);
        } else {
          localStorage.removeItem('accessToken');
          sessionStorage.setItem('accessToken', accessToken);
        }
        navigate(appRoutes.dashboard);
      }
    }
  );

  const onSubmit: SubmitHandler<LogInForm> = userData => {
    const { remember, ...dataWithoutRemember } = userData;
    mutate(dataWithoutRemember);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>HR Dashboard - Sign In</title>
      </Helmet>
      <Box sx={styles.box}>
        <Paper elevation={5} sx={styles.paper}>
          <Typography variant="h1" sx={styles.typography}>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1.5} sx={styles.stack}>
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
              <FormControlLabel
                control={<Checkbox {...register('remember')} />}
                label="Remember me"
              />
              {mutateError?.response?.data?.message && (
                <Alert severity="error">
                  {mutateError.response.data.message}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ fontSize: '1rem', p: 1.5 }}
              >
                Sign In
              </Button>
              {isLoading && <CircularProgress />}
            </Stack>
          </form>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href={appRoutes.signUp}>Click here to create one</Link>
          </Typography>
        </Paper>
      </Box>
    </HelmetProvider>
  );
};

export default SignIn;
