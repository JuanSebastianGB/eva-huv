import React from 'react';
import { Link } from 'react-router-dom';
import { TemporalCreateUserButton } from '../TemporalCreateUserButton';
import { TemporalDeleteUserButton } from '../TemporalDeleteUserButton';
export interface HeaderInterface {}

const Header: React.FC<HeaderInterface> = () => {
  return (
    <div>
      <h2>Header</h2>
      <TemporalCreateUserButton />
      <TemporalDeleteUserButton />
      <Link to={'/private/services'}>Services</Link>
    </div>
  );
};

export default Header;
