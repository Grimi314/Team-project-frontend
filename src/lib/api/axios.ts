import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);