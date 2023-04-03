import axios, { InternalAxiosRequestConfig } from 'axios';

import { SignUpRequestPayload } from 'views/singUp/register.schema';
import { LogInRequestPayload } from 'views/signIn/login.schema';

import { tokenStorage } from './tokenStorage';

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

export const refreshTokenRequest = async (token: string | undefined) => {
  await api.post('/auth/refresh-token', token);
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenStorage.getAccessTokenRaw();
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
    console.log('interceptor response success', res);
    return res;
  },
  error => {
    console.log('interceptor response error', error);
    if (error.response.data.statusCode === 401) {
      const refreshToken = tokenStorage.getRefreshTokenRaw();
      refreshTokenRequest(refreshToken);
    }
    return error;
  }
);
