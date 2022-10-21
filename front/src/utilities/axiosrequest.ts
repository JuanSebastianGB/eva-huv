import axios from 'axios';

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
  (config) => {
    const token = localStorage.getItem('x-access-token');
    if (token) config.headers!['x-access-token'] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInterceptor };
