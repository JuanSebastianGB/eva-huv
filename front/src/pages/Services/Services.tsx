import React, { Fragment } from 'react';
import { FormCreateService, ServicesTable } from './components';
import { useServicesData } from './hooks';
export interface ServicesInterface {}

const Services: React.FC<ServicesInterface> = () => {
  const { handleCreateService } = useServicesData();

  return (
    <Fragment>
      <h3>Services</h3>
      <button onClick={handleCreateService}>Create Service</button>
      <ServicesTable />
      <FormCreateService />
    </Fragment>
  );
};

export default Services;
