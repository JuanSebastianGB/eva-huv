import { createServiceAdapter } from '@/adapters';
import { fetchAxiosServices, fetchCreateService } from '@/services';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { useServicesContext } from '../context';

const useServicesTable = (): any => {
  const { servicesState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const handleCreateService = async () => {
    const serviceToCreate = { name: 'new test service' + uuid() };
    const createdService = await fetchCreateService(serviceToCreate);
    const { response } = createdService;
    if (!response.err) {
      setListServices([...listServices, createServiceAdapter(response)]);
    }
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      // const services = await fetchServices();
      const services = await fetchAxiosServices();
      await setListServices(services.data.response);
    })();
  }, []);

  return { listServices, setListServices, handleCreateService };
};

export default useServicesTable;
