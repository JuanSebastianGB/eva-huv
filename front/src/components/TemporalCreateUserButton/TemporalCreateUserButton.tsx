import { PrivateRoutes } from '@/models';
import { createUser } from '@/redux/states/userSlice';
import { fetchCharacter } from '@/services';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export interface TemporalCreateUserButtonInterface {}

const TemporalCreateUserButton: React.FC<
  TemporalCreateUserButtonInterface
> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateUser = async () => {
    const character = await fetchCharacter();
    dispatch(createUser(character));
    navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
  };
  return <button onClick={handleCreateUser}>TemporalCreateUserButton</button>;
};

export default TemporalCreateUserButton;
