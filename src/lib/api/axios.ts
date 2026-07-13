import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://team-project-backend-ezbf.onrender.com',
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);
