import { fetchServices } from '@/services';
import { useEffect } from 'react';
import { useServicesContext } from '../context';

const useServicesTable = (): any => {
  const { listServices, setListServices } = useServicesContext() as any;

  useEffect((): void => {
    (async (): Promise<void> => {
      const services = await fetchServices();
      setListServices(services.response);
    })();
  }, []);

  return { listServices, setListServices };
};

export default useServicesTable;
