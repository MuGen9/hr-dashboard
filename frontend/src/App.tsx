import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainView from 'views/main/Main';
import SignIn from 'views/signIn/SignIn';
import SignUp from 'views/singUp/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainView />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
