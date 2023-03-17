import { useEffect } from 'react';
import {
  Link,
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import { appRoutes } from 'routes/routes';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  useEffect(() => {
    document.title = 'HR Dashboard - Sign Up';
  }, []);

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
                required: true,
                minLength: 4,
                maxLength: 15
              })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName && `${errors.firstName.message}`}
            />
            <TextField
              label="Last name *"
              variant="standard"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('lastName', { required: true })}
            />
            <TextField
              label="Email *"
              variant="standard"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('email', { required: true })}
            />
            <TextField
              label="Password *"
              variant="standard"
              type="password"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('password', { required: true })}
            />
            <TextField
              label="Repeat Password *"
              variant="standard"
              type="password"
              sx={{ width: { xs: '230px', sm: '300px' } }}
              {...register('passwordRepeat', { required: true })}
            />
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
