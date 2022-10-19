import { ServicesEmptyState } from '@/models';
import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ServicesContext = createContext({});

export const ServicesProvider = ({ children }: Props) => {
  const [listServices, setListServices] = useState(ServicesEmptyState);

  return (
    <ServicesContext.Provider value={{ listServices, setListServices }}>
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
