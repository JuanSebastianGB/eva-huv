import { urlPaths } from '@/models';
import { axiosInterceptor } from '@/utilities';

export const fetchMedicalDevices = async () => {
  return await axiosInterceptor.get(urlPaths.BASE_MEDICAL_DEVICES);
};
