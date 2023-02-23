import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { appRoutes } from 'routes/routes';

const SignIn = () => {
  return (
    <>
      <h2>Sign in!</h2>
      <Link to={appRoutes.main}>
        <Button
          color="warning"
          variant="contained"
          sx={{ fontSize: '1.2rem', m: 2, p: 2 }}
        >
          Back
        </Button>
      </Link>
    </>
  );
};

export default SignIn;
