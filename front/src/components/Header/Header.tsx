import { AppStore, User } from '@/models';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../LogoutButton';
import { ShowOnLogout } from '../ShowOnLogout';
import './Header.scss';
export interface HeaderInterface {}

const Header: React.FC<HeaderInterface> = () => {
  const userState = useSelector((store: AppStore): User => store.user);
  useEffect(() => {}, [userState]);

  return (
    <div className="header">
      <div className="logo">
        <Link to="/login">EVA</Link>
      </div>
      <div className="menu">
        <ShowOnLogout>
          <Link to={'/private/services'}>Services</Link>
        </ShowOnLogout>
        <ShowOnLogout>
          <Link to={'/private/areas'}>Areas</Link>
        </ShowOnLogout>
        <ShowOnLogout>
          <Link to={'/private/medicaldevices'}>Medical devices</Link>
        </ShowOnLogout>
      </div>
      <ShowOnLogout>
        <LogoutButton />
      </ShowOnLogout>
    </div>
  );
};

export default Header;
