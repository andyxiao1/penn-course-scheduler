import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/schedule/',
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' }
});
