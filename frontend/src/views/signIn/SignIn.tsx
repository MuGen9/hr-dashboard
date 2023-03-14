import { Link, Button } from '@mui/material';

import { appRoutes } from 'routes/routes';

const SignIn = () => {
  return (
    <>
      <h2>Sign in!</h2>
      <Link href={appRoutes.main}>
        <Button
          color="primary"
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
