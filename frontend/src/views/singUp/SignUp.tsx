import { Link } from 'react-router-dom';

import MyButton from 'components/MyButton';
import { appRoutes } from 'routes/routes';

const SignUp = () => {
  return (
    <>
      <h2>Sign up!</h2>
      <Link to={appRoutes.main}>
        <MyButton buttonText="Back" />
      </Link>
    </>
  );
};

export default SignUp;
