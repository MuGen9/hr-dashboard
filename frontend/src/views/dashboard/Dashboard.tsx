import { Box, Link, Paper, Typography } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { appRoutes } from 'utils/routes';

const Dashboard = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>HR Dashboard - Dashboard</title>
      </Helmet>
      <Box>
        <Paper>
          <Typography>Hello Dashboard</Typography>
          <Link href={appRoutes.signIn}>Back</Link>
        </Paper>
      </Box>
    </HelmetProvider>
  );
};

export default Dashboard;
