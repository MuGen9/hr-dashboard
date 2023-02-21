import { Link } from 'react-router-dom';

import './Main.scss';
import MyButton from 'components/MyButton';

const MainView = () => {
  return (
    <div className="mainWrapper">
      <div className="mainBox">
        <h1>
          HR <br className="hide" />
          Analytics
        </h1>
        <div className="buttonWrapper">
          <Link to="/signin">
            <MyButton buttonText="Sign in" />
          </Link>
          <Link to="/signup">
            <MyButton buttonText="Sign up" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainView;
