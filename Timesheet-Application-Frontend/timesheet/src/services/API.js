import axios from 'axios';

const url = 'https://timesheet-324823.ue.r.appspot.com/';

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
