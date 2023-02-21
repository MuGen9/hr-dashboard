import { Link } from 'react-router-dom';

import MyButton from 'components/MyButton';

const SignUp = () => {
  return (
    <>
      <h2>Sign up!</h2>
      <Link to="/">
        <MyButton buttonText="Back" />
      </Link>
    </>
  );
};

export default SignUp;
