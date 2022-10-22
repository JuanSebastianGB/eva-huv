import { createServiceAdapter } from '@/adapters';
import { useFetchAndLoad } from '@/hooks';
import { fetchAxiosCreateService } from '@/services';
import React from 'react';
import uuid from 'react-uuid';
import { useServicesContext } from '../../context';

export interface ButtonCreateRandomServiceInterface {}

const ButtonCreateRandomService: React.FC<
  ButtonCreateRandomServiceInterface
> = () => {
  const { servicesState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const { callEndpoint } = useFetchAndLoad();

  const handleCreateService = async (): Promise<void> => {
    const serviceToCreate = { name: uuid() };

    try {
      const response = await callEndpoint(
        fetchAxiosCreateService(serviceToCreate)
      );
      setListServices([
        ...listServices,
        createServiceAdapter(response.data.response),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleCreateService}>Create Service</button>;
};

export default ButtonCreateRandomService;
