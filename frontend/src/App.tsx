import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainView from 'views/main/Main';
import SignIn from 'views/signIn/SignIn';
import SignUp from 'views/singUp/SignUp';
import Dashboard from 'views/dashboard/Dashboard';
import { appRoutes, ProtectedRoute } from 'utils/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appRoutes.main}>
          <Route index element={<MainView />} />
          <Route path={appRoutes.signIn} element={<SignIn />} />
          <Route path={appRoutes.signUp} element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path={appRoutes.dashboard} element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
