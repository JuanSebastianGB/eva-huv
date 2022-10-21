import { createServiceAdapter } from '@/adapters';
import { fetchCreateService } from '@/services';
import React from 'react';
import uuid from 'react-uuid';
import { useServicesContext } from '../../context';

export interface ButtonCreateRandomServiceInterface {}

const ButtonCreateRandomService: React.FC<
  ButtonCreateRandomServiceInterface
> = () => {
  const { servicesState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const handleCreateService = async (): Promise<void> => {
    const serviceToCreate = { name: uuid() };
    const createdService = await fetchCreateService(serviceToCreate);
    const { response } = createdService;
    if (!response.err) {
      setListServices([...listServices, createServiceAdapter(response)]);
    }
  };
  return <button onClick={handleCreateService}>Create Service</button>;
};

export default ButtonCreateRandomService;
