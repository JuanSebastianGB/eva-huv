import { Service } from '@/models';

export const createServiceAdapter = (serviceApi: any): Service => {
  return {
    id: serviceApi.id,
    name: serviceApi.name,
  };
};
