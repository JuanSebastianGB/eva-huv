import { Service } from '@/models';
import { useServicesContext } from '@/pages/Services/context';
import React from 'react';
import { ServicesTableRow } from '../ServicesTableRow';
export interface ServicesTableBodyInterface {}

const ServicesTableBody: React.FC<ServicesTableBodyInterface> = () => {
  const { listServices } = useServicesContext() as any;
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
