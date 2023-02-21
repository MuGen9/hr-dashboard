import { Link } from 'react-router-dom';

import MyButton from 'components/MyButton';

const SignIn = () => {
  return (
    <>
      <h2>Sign in!</h2>
      <Link to="/">
        <MyButton buttonText="Back" />
      </Link>
    </>
  );
};

export default SignIn;
