import { useEffect } from 'react';
import { Link, Button, Box, Paper, Stack, Typography } from '@mui/material';

import { appRoutes } from 'routes/routes';

const SignIn = () => {
  useEffect(() => {
    document.title = 'HR Dashboard - Sign In';
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
        sx={{ p: 2, display: { xs: 'contents', sm: 'block' } }}
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
          Sign in
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Link href={appRoutes.main}>
            <Button
              color="primary"
              variant="contained"
              sx={{ fontSize: '1.2rem', m: 2, p: 2 }}
            >
              Back
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignIn;