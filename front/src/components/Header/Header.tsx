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
      <h2>Header</h2>
      <Link to={'/private/services'}>Services</Link>
      <Link to={'/private/areas'}>Areas</Link>
      <Link to={'/private/medicaldevices'}>Medical devices</Link>
      {!!userState?.email && <LogoutButton />}
    </div>
  );
};

export default Header;
