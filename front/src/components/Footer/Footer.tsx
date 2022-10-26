import { getActualDate } from '@/utilities/date';
import React from 'react';
export interface FooterInterface {}

import './Footer.scss';

const Footer: React.FC<FooterInterface> = () => {
  return (
    <footer className="footer">
      <div className="version">
        Copyright @ {getActualDate()}. All rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
