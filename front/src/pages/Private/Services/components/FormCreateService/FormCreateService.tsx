import { createServiceAdapter } from '@/adapters';
import { useFetchAndLoad } from '@/hooks';
import { ServiceEmptyState } from '@/models';
import { fetchAxiosCreateService } from '@/services';
import React, { useState } from 'react';
import { useServicesContext } from '../../context';
export interface FormCreateServiceInterface {}

const FormCreateService: React.FC<FormCreateServiceInterface> = () => {
  const [createdService, setCreatedService] = useState(ServiceEmptyState);
  const { servicesState } = useServicesContext() as any;
  const { callEndpoint } = useFetchAndLoad();
  const handleChange = (e: any) => {
    setCreatedService({ ...createdService, [e.target.name]: e.target.value });
  };
  const handleCreateService = async (e: any) => {
    e.preventDefault();
    try {
      const response = await callEndpoint(
        fetchAxiosCreateService(createdService)
      );
      servicesState.setListServices([
        ...servicesState.listServices,
        createServiceAdapter(response.data.response),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" onSubmit={handleCreateService}>
      <label htmlFor="">
        <input
          type="text"
          name="name"
          value={createdService.name}
          onChange={handleChange}
        />
      </label>
      <button>Create Service</button>
    </form>
  );
};

export default FormCreateService;
