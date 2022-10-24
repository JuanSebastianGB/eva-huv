import { useFetchAndLoad } from '@/hooks';
import { Orbit } from '@uiball/loaders';
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
      <ButtonCreateRandomService />
      {!load ? <ServicesTable /> : <Orbit size={150} color="#231F20" />}
      {idState.serviceId !== 0 ? <FormUpdateService /> : <FormCreateService />}
    </Fragment>
  );
};

export default Services;
