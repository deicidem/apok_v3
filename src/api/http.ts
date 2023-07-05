import axios from 'axios';
const url = '/api/';

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorMessage?: string
    ignore?: boolean
  }
}
const instance = axios.create({
  baseURL: url,
  // baseURL: "http://192.168.1.104/apok_backend_php/public/",
  timeout: 10000000000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export function addErrorHandler(fn: any) {
  instance.interceptors.response.use((response) => response, fn);
}

export default instance;
