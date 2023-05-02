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
    }
  }, [navigate, token]);

  if (!token) return null;
  return <Outlet />;
};

export const RedirectUser = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem('accessToken') ||
    sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      navigate(appRoutes.dashboard);
    }
  }, [navigate, token]);

  return <Outlet />;
};
