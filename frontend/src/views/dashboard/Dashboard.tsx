import { Box, Link, Paper, Typography } from '@mui/material';

import { appRoutes } from 'utils/routes';

const Dashboard = () => {
  return (
    <Box>
      <Paper>
        <Typography>Hello Dashboard</Typography>
        <Link href={appRoutes.signIn}>Back</Link>
      </Paper>
    </Box>
  );
};

export default Dashboard;
