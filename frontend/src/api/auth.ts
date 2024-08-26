import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
  console.log(response.data);
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const createTask = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/task`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};