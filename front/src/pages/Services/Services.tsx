import { createServiceAdapter } from '@/adapters';
import { fetchCreateService } from '@/services';
import React, { Fragment } from 'react';
import uuid from 'react-uuid';
import { ServicesTable } from './components/ServicesTable';
import { useServicesData } from './hooks';
export interface ServicesInterface {}

const Services: React.FC<ServicesInterface> = () => {
  const { listServices, setListServices } = useServicesData();

  const handleCreateService = async () => {
    const serviceToCreate = { name: 'new test service' + uuid() };
    const createdService = await fetchCreateService(serviceToCreate);
    const { response } = createdService;
    if (!response.err) {
      setListServices([...listServices, createServiceAdapter(response)]);
    }
  };
  return (
    <Fragment>
      <h3>Services</h3>
      <button onClick={handleCreateService}>Create Service</button>
      <ServicesTable
        listServices={listServices}
        setListServices={setListServices}
      />
    </Fragment>
  );
};

export default Services;
