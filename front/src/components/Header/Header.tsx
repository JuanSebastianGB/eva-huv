import { AppStore, User } from '@/models';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../LogoutButton';
import './Header.scss';
export interface HeaderInterface {}

const Header: React.FC<HeaderInterface> = () => {
  const userState = useSelector((store: AppStore): User => store.user);
  return (
    <div className="header">
      <div className="logo">
        <Link to="/login">EVA</Link>
      </div>
      <div className="menu">
        {userState.isLoggedIn && <Link to={'/private/services'}>Services</Link>}
        {userState.isLoggedIn && <Link to={'/private/areas'}>Areas</Link>}
        {userState.isLoggedIn && (
          <Link to={'/private/medicaldevices'}>Medical devices</Link>
        )}
      </div>
      {userState.isLoggedIn && <LogoutButton />}
    </div>
  );
};

export default Header;
