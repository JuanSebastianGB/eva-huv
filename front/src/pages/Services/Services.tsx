import React, { Fragment } from 'react';
import {
  FormCreateService,
  FormUpdateService,
  ServicesTable,
} from './components';
import { useServicesContext } from './context';
import { useServicesData } from './hooks';
export interface ServicesInterface {}

const Services: React.FC<ServicesInterface> = () => {
  const { handleCreateService } = useServicesData();
  const { idState } = useServicesContext() as any;

  return (
    <Fragment>
      <h3>Services</h3>
      <button onClick={handleCreateService}>Create Service</button>
      <ServicesTable />
      {idState.serviceId !== 0 ? <FormUpdateService /> : <FormCreateService />}
    </Fragment>
  );
};

export default Services;
