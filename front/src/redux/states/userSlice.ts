import { sliceTypes } from '@/models';
import { deleteFromLocalStorage, setLocalStorage } from '@/utilities';
import { createSlice } from '@reduxjs/toolkit';
import { User, userEmptyState } from '../../models/user.model';

const userSlice = createSlice({
  name: sliceTypes.USER,
  initialState: userEmptyState,
  reducers: {
    createUser: (_, action): User => {
      setLocalStorage('user', action.payload);
      return action.payload;
    },
    editUser: (state, action): User => ({ ...state, ...action.payload }),
    resetUser: (): User => {
      deleteFromLocalStorage('user');
      return userEmptyState;
    },
  },
});

export const { createUser, editUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
