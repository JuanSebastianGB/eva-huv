import { AppStore } from '@/models';
import { configureStore } from '@reduxjs/toolkit';
import { serviceSlice, userSlice } from './states';
import servicesSlice from './states/servicesSlice';

export default configureStore<AppStore>({
  reducer: {
    user: userSlice,
    service: serviceSlice,
    services: servicesSlice,
  },
});
