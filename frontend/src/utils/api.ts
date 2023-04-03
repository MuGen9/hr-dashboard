import axios, { InternalAxiosRequestConfig } from 'axios';

import { SignUpRequestPayload } from 'views/singUp/register.schema';
import { LogInRequestPayload } from 'views/signIn/login.schema';

import { tokenStorage } from './tokenStorage';

type RefreshTokenType = {
  refreshToken?: string;
  remember?: boolean;
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const registerRequest = async (data: SignUpRequestPayload) => {
  await api.post('/auth/register', data);
};

export const logInRequest = async (userData: LogInRequestPayload) => {
  const { data } = await api.post('/auth/login', userData);
  return data;
};

export const refreshTokenRequest = async (token: RefreshTokenType) => {
  await api.post('/auth/refresh-token', token);
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      localStorage.getItem('accessToken') ??
      sessionStorage.getItem('accessToken');
    const newConfig = config;
    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log('interceptor request newConfig', newConfig);
    return newConfig;
  },
  error => {
    // If the interceptor encounters an error, return a rejected Promise
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  res => {
    console.log('interceptor response: ', res);
    return res;
  },
  error => {
    console.log('res error', error);
    if (error.response.data.statusCode === 401) {
      console.log('interceptor response 401');
      const refreshToken = tokenStorage.getRefreshToken();
      console.log(refreshToken);
      refreshTokenRequest(refreshToken);
    }
    return error;
  }
);
