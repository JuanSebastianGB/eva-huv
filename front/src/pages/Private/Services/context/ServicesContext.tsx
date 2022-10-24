import { ServicesEmptyState } from '@/models';
import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ServicesContext = createContext({});

export const ServicesProvider = ({ children }: Props) => {
  const [listServices, setListServices] = useState(ServicesEmptyState);
  const [serviceId, setServiceId] = useState(0);

  return (
    <ServicesContext.Provider
      value={{
        servicesState: { listServices, setListServices },
        idState: { serviceId, setServiceId },
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
export const useServicesContext = (): {} => {
  const context = useContext(ServicesContext);
  if (context === undefined)
    throw new Error(`Context is out of ${ServicesProvider}`);
  return context;
};
