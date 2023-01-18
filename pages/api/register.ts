import { API_URL, AUTH_KEY } from '@/constants';
import { RegisterInput } from '../register';

export const registerUser = async (user: RegisterInput) => {

  const request = await fetch(API_URL + "?rest_route=/simple-jwt-login/v1/users", {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      AUTH_KEY: AUTH_KEY
    }),
    headers: { "Content-Type": "application/json" }
  })

  const response = await request.json();
  return response;
};