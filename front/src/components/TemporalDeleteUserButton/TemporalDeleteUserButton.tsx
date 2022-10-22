import { resetUser } from '@/redux/states/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
export interface TemporalDeleteUserButtonInterface {}

const TemporalDeleteUserButton: React.FC<
  TemporalDeleteUserButtonInterface
> = () => {
  const dispatch = useDispatch();
  const handleDeleteUser = () => dispatch(resetUser());

  return <button onClick={handleDeleteUser}>TemporalDeleteUserButton</button>;
};

export default TemporalDeleteUserButton;
