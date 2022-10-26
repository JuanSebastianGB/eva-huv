import { useFetchAndLoad } from '@/hooks';
import { Ring } from '@uiball/loaders';
import React, { Fragment } from 'react';
import {
  FormCreateService,
  FormUpdateService,
  ServicesTable,
} from './components';
import { ButtonCreateRandomService } from './components/ButtonCreateRandomService';
import { useServicesContext } from './context';
import { useServicesData } from './hooks';
export interface ServicesInterface {}

const Services: React.FC<ServicesInterface> = () => {
  useServicesData();
  const { idState } = useServicesContext() as any;
  const { load } = useFetchAndLoad();

  return (
    <Fragment>
      <h3>Services</h3>
      {!load ? (
        <Fragment>
          <ButtonCreateRandomService />
          <ServicesTable />
        </Fragment>
      ) : (
        <Ring size={40} lineWeight={5} speed={2} color="black" />
      )}
      {idState.serviceId !== 0 ? <FormUpdateService /> : <FormCreateService />}
    </Fragment>
  );
};

export default Services;
