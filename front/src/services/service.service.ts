import { AxiosCall, Service, urlPaths } from '@/models';
import { axiosInterceptor, controller } from '@/utilities';

export const fetchAxiosServices = (): AxiosCall<any> => {
  const { signal } = controller;
  return {
    call: axiosInterceptor.get<Service[]>(urlPaths.BASE_SERVICES, { signal }),
    controller,
  };
};

export const fetchAxiosCreateService = (service: any): AxiosCall<any> => {
  const { signal } = controller;
  return {
    call: axiosInterceptor.post(urlPaths.BASE_SERVICES, { signal, ...service }),
    controller,
  };
};

export const fetchAxiosUpdateService = (
  service: any,
  id: number
): AxiosCall<any> => {
  const { signal } = controller;
  return {
    call: axiosInterceptor.put(`${urlPaths.BASE_SERVICES}/${id}`, {
      ...service,
      signal,
    }),
    controller,
  };
};

export const fetchAxiosDeleteService = (id: number): AxiosCall<any> => {
  return {
    call: axiosInterceptor.delete(`${urlPaths.BASE_SERVICES}/${id}`),
    controller,
  };
};

export const fetchAxiosOneService = (id: number): AxiosCall<any> => {
  return {
    call: axiosInterceptor.get(`${urlPaths.BASE_SERVICES}/${id}`),
    controller,
  };
};
