import { SelectServices } from '@/components';
import React from 'react';
import { useParams } from 'react-router-dom';
export interface FormInsertDeviceInterface {}

const FormInsertDevice: React.FC<FormInsertDeviceInterface> = () => {
  const { id } = useParams();
  return (
    <div
      style={{
        minHeight: '60vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form action="">
        <label htmlFor="name">Name</label>
        <span>Editing id{id}</span>
        <input
          style={{
            borderRadius: '10px',
            padding: '1rem',
            border: 'none',
            display: 'block',
            paddingLeft: '2px',
          }}
          type="text"
          name="name"
          placeholder="name"
        />
        <SelectServices />
        <SelectServices />
        <SelectServices />
      </form>
    </div>
  );
};

export default FormInsertDevice;
