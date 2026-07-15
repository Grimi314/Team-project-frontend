import { api } from '@/lib/api/axios';

interface RegisterData {
  name?: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string | null;
}

export const registerUser = async (data: RegisterData) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: LoginData) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

export const updateUserProfile = async (data: UpdateProfileData) => {
  const res = await api.patch('/users/profile', data);
  return res.data;
};