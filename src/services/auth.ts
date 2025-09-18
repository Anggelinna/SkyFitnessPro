import { API_ENDPOINTS } from './eindpoints';
import api from './axios';

type signInUserProps = {
  email: string;
  password: string;
};

type signUpUserProps = signInUserProps;

export async function signInUser(data: signInUserProps) {
  const response = await api.post(API_ENDPOINTS.SIGN_IN, data, {
    headers: {
      'Content-Type': '',
    },
  });
  return response.data;
}

export async function signUpUser(data: signUpUserProps) {
  const response = await api.post(API_ENDPOINTS.SIGN_UP, data, {
    headers: {
      'Content-Type': '',
    },
  });
  return response.data.message;
}