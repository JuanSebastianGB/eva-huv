import { sliceTypes } from '@/models';
import {
  Service,
  ServiceEmptyState,
  ServicesEmptyState,
} from '@/models/service.model';
import { createSlice } from '@reduxjs/toolkit';

const servicesSlice = createSlice({
  name: sliceTypes.SERVICE,
  initialState: ServiceEmptyState,
  reducers: {
    createServices: (state, action) => action.payload,
    editServices: (state, action): any => {
      return state.map((service: Service) =>
        service.id === action.payload
          ? { ...state, ...action.payload }
          : ServicesEmptyState
      );
    },
    resetServices: (state, action): any => ServicesEmptyState,
  },
});

export const { createServices, editServices, resetServices } =
  servicesSlice.actions;

export default servicesSlice.reducer;
