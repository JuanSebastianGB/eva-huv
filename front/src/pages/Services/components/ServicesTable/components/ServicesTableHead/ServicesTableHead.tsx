import React from 'react';
export interface ServicesTableHeadInterface {}

const ServicesTableHead: React.FC<ServicesTableHeadInterface> = () => {
  return (
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default ServicesTableHead;
