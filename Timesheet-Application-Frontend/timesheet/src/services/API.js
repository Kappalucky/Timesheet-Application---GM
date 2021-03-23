import axios from 'axios';

const url = 'http://localhost:8000/';

const api = axios.create({
  baseURL: url,
  withCredentials: false,
  responseType: 'json',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
