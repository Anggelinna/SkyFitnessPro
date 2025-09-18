import axios from 'axios';

export const API_URL = 'https://wedev-api.sky.pro/api/fitness';

const api = axios.create({
  baseURL: API_URL,
});

export default api;