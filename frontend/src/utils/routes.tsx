import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const appRoutes = {
  main: '/',
  signIn: '/signin',
  signUp: '/signup',
  dashboard: '/dashboard'
};

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      navigate(appRoutes.signIn);
      return null;
    }
    return <Outlet />;
  }, [navigate, token]);

  return <Outlet />;
};
