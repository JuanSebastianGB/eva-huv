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
