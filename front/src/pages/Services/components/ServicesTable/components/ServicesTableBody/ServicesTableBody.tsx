import { Service } from '@/models';
import { useServicesContext } from '@/pages/Services/context';
import React from 'react';
import { ServicesTableRow } from '../ServicesTableRow';
export interface ServicesTableBodyInterface {}

const ServicesTableBody: React.FC<ServicesTableBodyInterface> = () => {
  const { servicesState } = useServicesContext() as any;
  const { listServices } = servicesState;
  return (
    <tbody>
      {listServices &&
        listServices.map((service: Service) => (
          <ServicesTableRow key={service.id} service={service} />
        ))}
    </tbody>
  );
};

export default ServicesTableBody;
