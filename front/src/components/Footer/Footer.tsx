import { AppStore, User } from '@/models';
import React from 'react';
import { useSelector } from 'react-redux';
export interface FooterInterface {}

const Footer: React.FC<FooterInterface> = () => {
  const userState = useSelector((store: AppStore): User => store.user);
  return (
    <div>
      <h3>Footer</h3>
      <pre>{JSON.stringify(userState, null, 2)}</pre>
    </div>
  );
};

export default Footer;
