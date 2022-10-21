import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorage } from './localstorage.utility';

export const axiosRequest = async ({ ...options }): Promise<any> => {
  const client = axios.create({ baseURL: options.url });
  if (options['x-access-token'])
    client.defaults.headers.common['x-access-token'] =
      options['x-access-token'];
  const onSuccess = (response: any) => response;
  const onError = (error: any) => error;
  return client(options).then(onSuccess).catch(onError);
};

const axiosInterceptor = axios.create();
axiosInterceptor.interceptors.request.use(
  (request): AxiosRequestConfig<any> => {
    request.headers = getLocalStorage('x-access-token')
      ? getLocalStorage('x-access-token')
      : null;
    return request;
  },
  (error) => Promise.reject(error)
);

export { axiosInterceptor };
