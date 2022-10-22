import { PrivateRoutes } from '@/models';
import { RoutesWithNotFound } from '@/utilities';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Home } from '../Home';
import { Services, ServicesProvider } from '../Services';
export interface PrivateInterface {}

const Private: React.FC<PrivateInterface> = () => {
  return (
    <RoutesWithNotFound>
      <Route
        path="/*"
        element={
          <>
            <h3>Not Found</h3>
          </>
        }
      />
      <Route path="" element={<Navigate to={PrivateRoutes.HOME} />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
      <Route
        path={PrivateRoutes.SERVICES}
        element={
          <ServicesProvider>
            <Services />
          </ServicesProvider>
        }
      />
    </RoutesWithNotFound>
  );
};

export default Private;
