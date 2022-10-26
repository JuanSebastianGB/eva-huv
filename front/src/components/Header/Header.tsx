import { AppStore } from '@/models';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../LogoutButton';
import './Header.scss';
export interface HeaderInterface {}

const Header: React.FC<HeaderInterface> = () => {
  const userState = useSelector((store: AppStore) => store.user);

  return (
    <div className="header">
      <div className="logo">
        <Link to="/login">EVA</Link>
      </div>
      <div className="menu">
        <Link to={'/private/services'}>Services</Link>
        <Link to={'/private/areas'}>Areas</Link>
        <Link to={'/private/medicaldevices'}>Medical devices</Link>
      </div>
      {!!userState?.email && <LogoutButton />}
    </div>
  );
};

export default Header;
