import axios from 'axios';
import config from '../config';

const baseURL = config.apiRoot;
const AUTH_HEADER_NAME = 'x-auth';

let apiResource = axios.create({
  baseURL,
  headers: { 'Access-Control-Request-Headers': 'x-auth' }
});

const api = {
  setAuth: ({ token }) => {
    apiResource = axios.create({
      baseURL,
      headers: { [AUTH_HEADER_NAME]: token }
    });
  },
  get: async url => apiResource.get(url),
  post: async (url, data) => apiResource.post(url, data)
};

export default api;
