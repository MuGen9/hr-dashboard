import axios from 'axios';

import { SignUpRequestPayload } from 'views/singUp/register.schema';
import { LogInRequestPayload } from 'views/signIn/login.schema';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const registerRequest = async (data: SignUpRequestPayload) => {
  await api.post('/auth/register', data);
};

export const logInRequest = async (userData: LogInRequestPayload) => {
  const { data } = await api.post('/auth/login', userData);
  return data;
};
