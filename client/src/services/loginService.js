import axios from 'axios';
const baseUrl = '/api/login';

export const login = async (credents) => {
  const response = await axios.post(baseUrl, credents);
  return response.data;
};
