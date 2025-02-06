import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { showToast } from './helpers/toast';

export const api_base_url =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const axiosInstance = axios.create({
  baseURL: api_base_url,
});

// Helper function to get cookie by name
const getCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
};

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getCookie('token');
      if (token) {
        config.headers['Authorization'] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      showToast('Server Network Error!', 'error');
    }
    if (error?.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Clear all cookies
        deleteCookie('token');
        // Redirect to login
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

if (typeof window !== 'undefined') {
  window.addEventListener('offline', () => {
    showToast('Network is offline!', 'error');
    return;
  });
}

interface RequestMethods {
  get: <T>(URL: string, params?: Record<string, any>) => Promise<T>;
  post: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(
    URL: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  patch: <T>(URL: string, body: any, config?: AxiosRequestConfig) => Promise<T>;
}

const request: RequestMethods = {
  get: (url, params) => axiosInstance.get(url, { params }).then(responseBody),
  post: (url, body) => axiosInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosInstance.put(url, body).then(responseBody),
  delete: (url, params) =>
    axiosInstance.delete(url, { params }).then(responseBody),
  patch: (url, body) => axiosInstance.patch(url, body).then(responseBody),
};

export default request;
