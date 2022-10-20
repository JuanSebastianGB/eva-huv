import { createServiceAdapter } from '@/adapters';
import { ServiceEmptyState } from '@/models';
import { fetchCreateService } from '@/services';
import React, { useState } from 'react';
import { useServicesContext } from '../../context';
export interface FormCreateServiceInterface {}

const FormCreateService: React.FC<FormCreateServiceInterface> = () => {
  const [createdService, setCreatedService] = useState(ServiceEmptyState);
  const { servicesState } = useServicesContext() as any;
  const handleChange = (e: any) => {
    setCreatedService({ ...createdService, [e.target.name]: e.target.value });
  };
  const handleCreateService = async (e: any) => {
    e.preventDefault();
    const newService = await fetchCreateService(createdService);
    const { response } = newService;
    if (!response.err) {
      servicesState.setListServices([
        ...servicesState.listServices,
        createServiceAdapter(response),
      ]);
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
