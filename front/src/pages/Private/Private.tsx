import { PrivateRoutes } from '@/models';
import { RoutesWithNotFound } from '@/utilities';
import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { ServicesProvider } from './Services';
export interface PrivateInterface {}

const Home = lazy(() => import('./Home/Home'));
const MedicalDevices = lazy(() => import('./MedicalDevices/MedicalDevices'));
const Services = lazy(() => import('./Services/Services'));
const Areas = lazy(() => import('./Areas/Areas'));

const Private: React.FC<PrivateInterface> = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
      <Route
        path={PrivateRoutes.MEDICAL_DEVICES}
        element={<MedicalDevices />}
      />
      <Route path={PrivateRoutes.AREAS} element={<Areas />} />
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
