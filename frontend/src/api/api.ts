import axios from 'axios';

import { SignUpRequestPayload } from 'views/singUp/register.schema';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const registerRequest = async (data: SignUpRequestPayload) => {
  await api.post('/auth/register', data);
};
