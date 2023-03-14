import { Box, Button, Stack, Link, Paper, Typography } from '@mui/material';

import { appRoutes } from 'routes/routes';

const MainView = () => {
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
        sx={{ p: 1, display: { xs: 'contents', sm: 'block' } }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: '5rem',
            fontWeight: 'medium',
            margin: '1rem',
            wordBreak: 'break-all'
          }}
        >
          HR{' '}
          <Box component="br" sx={{ display: { xs: 'initial', sm: 'none' } }} />
          Analytics
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Link href={appRoutes.signIn}>
            <Button
              color="primary"
              variant="contained"
              sx={{ fontSize: '1.2rem', m: 2, p: 2 }}
            >
              Sign in
            </Button>
          </Link>
          <Link href={appRoutes.signUp}>
            <Button
              color="primary"
              variant="contained"
              sx={{ fontSize: '1.2rem', m: 2, p: 2 }}
            >
              Sign up
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default MainView;
