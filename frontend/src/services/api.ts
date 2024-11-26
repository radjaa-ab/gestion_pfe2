import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust this to your Laravel backend URL
});

export default api;

