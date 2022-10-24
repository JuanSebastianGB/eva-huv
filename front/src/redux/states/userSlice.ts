import { sliceTypes } from '@/models';
import {
  deleteFromLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from '@/utilities';
import { createSlice } from '@reduxjs/toolkit';
import { User, userEmptyState } from '../../models/user.model';

const userSlice = createSlice({
  name: sliceTypes.USER,
  initialState: getLocalStorage(sliceTypes.USER)
    ? getLocalStorage(sliceTypes.USER)
    : userEmptyState,
  reducers: {
    createUser: (_, action): User => {
      setLocalStorage(sliceTypes.USER, action.payload);
      return action.payload;
    },
    editUser: (state, action): User => ({ ...state, ...action.payload }),
    resetUser: (): User => {
      deleteFromLocalStorage(sliceTypes.USER);
      return userEmptyState;
    },
  },
});

export const { createUser, editUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
