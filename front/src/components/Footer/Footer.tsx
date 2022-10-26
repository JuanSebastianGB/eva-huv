import { AppStore, User } from '@/models';
import { getActualDate } from '@/utilities/date';
import React from 'react';
import { useSelector } from 'react-redux';
export interface FooterInterface {}

import './Footer.scss';

const Footer: React.FC<FooterInterface> = () => {
  const userState = useSelector((store: AppStore): User => store.user);
  return (
    <footer className="footer">
      <div className="version">
        Copyright @ {getActualDate()}. All rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
