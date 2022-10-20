import axios from 'axios';

export const axiosRequest = async ({ ...options }): Promise<any> => {
  const client = axios.create({ baseURL: options.url });
  client.defaults.headers.common['x-access-token'] = 'token';
  const onSuccess = (response: any) => response;
  const onError = (error: any) => error;
  return client(options).then(onSuccess).catch(onError);
};
