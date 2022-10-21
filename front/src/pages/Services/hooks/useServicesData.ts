import { useFetchAndLoad } from '@/hooks';
import { fetchAxiosServices } from '@/services';
import { useEffect } from 'react';
import { useServicesContext } from '../context';

const useServicesTable = (): any => {
  const { servicesState } = useServicesContext() as any;
  const { setListServices } = servicesState;

  const { load, callEndpoint } = useFetchAndLoad();

  useEffect((): void => {
    (async (): Promise<void> => {
      const services = await callEndpoint(fetchAxiosServices());
      setListServices(services.data.response);
    })();
  }, []);

  return { load };
};

export default useServicesTable;
