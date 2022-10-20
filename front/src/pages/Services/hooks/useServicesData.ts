import { createServiceAdapter } from '@/adapters';
import { fetchCreateService, fetchServices } from '@/services';
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
      const services = await fetchServices();
      setListServices(services.response);
    })();
  }, []);

  return { listServices, setListServices, handleCreateService };
};

export default useServicesTable;
