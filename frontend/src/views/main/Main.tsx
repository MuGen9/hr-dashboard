import { Link } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

import './Main.scss';
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
      <div className="mainBox">
        <h1>
          HR <br className="hide" />
          Analytics
        </h1>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          spacing={1.5}
        >
          <Link to={appRoutes.signIn}>
            <Button
              color="primary"
              variant="contained"
              sx={{ fontSize: '1.2rem', m: 2, p: 2 }}
            >
              Sign in
            </Button>
          </Link>
          <Link to={appRoutes.signUp}>
            <Button
              color="primary"
              variant="contained"
              sx={{ fontSize: '1.2rem', m: 2, p: 2 }}
            >
              Sign up
            </Button>
          </Link>
        </Stack>
      </div>
    </Box>
  );
};

export default MainView;
