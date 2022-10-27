import { PublicRoutes } from '@/models';
import { resetUser } from '@/redux/states/userSlice';
import { deleteManyFormLocalStorage } from '@/utilities';
import { Button } from '@mui/material';
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
      <Button
        color="warning"
        size="medium"
        variant="outlined"
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
