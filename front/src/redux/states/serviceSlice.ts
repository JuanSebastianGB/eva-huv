import { sliceTypes } from '@/models';
import { Service, ServiceEmptyState } from '@/models/service.model';
import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: sliceTypes.SERVICE,
  initialState: ServiceEmptyState,
  reducers: {
    createService: (_, action): Service => action.payload,
    editService: (state, action): Service => ({ ...state, ...action.payload }),
    resetService: (): Service => ServiceEmptyState,
  },
});

export const { createService, editService, resetService } =
  serviceSlice.actions;

export default serviceSlice.reducer;
