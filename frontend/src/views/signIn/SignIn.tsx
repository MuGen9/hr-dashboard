import { Link } from 'react-router-dom';

import MyButton from 'components/MyButton';
import { appRoutes } from 'routes/routes';

const SignIn = () => {
  return (
    <>
      <h2>Sign in!</h2>
      <Link to={appRoutes.main}>
        <MyButton buttonText="Back" />
      </Link>
    </>
  );
};

export default SignIn;
