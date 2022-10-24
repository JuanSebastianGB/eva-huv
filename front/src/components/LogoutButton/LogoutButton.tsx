import { PublicRoutes } from '@/models';
import { resetUser } from '@/redux/states/userSlice';
import { deleteManyFormLocalStorage } from '@/utilities';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export interface LogoutInterface {}

const LogoutButton: React.FC<LogoutInterface> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    deleteManyFormLocalStorage(['x-access-token', 'user']);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  };
  return (
    <div className="logout">
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default LogoutButton;
