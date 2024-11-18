// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api',
  timeout: 10000, // Thời gian chờ request
});

export default api;
