import { PrivateRoutes } from '@/models';
import { fetchMedicalDevices } from '@/services/medicaldevices.service';
import React, { Fragment, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
export interface MedicalDevicesInterface {}

interface Device {
  id: number;
  name: string;
}

const MedicalDevices: React.FC<MedicalDevicesInterface> = () => {
  const [medicalDevices, setMedicalDevices] = useState([]);
  const navigate = useNavigate();
  const handleOpenFormEdit = (id: number) => {
    navigate(`/${PrivateRoutes.MEDICAL_DEVICES}/${id}`, { replace: true });
  };

  useEffect(() => {
    (async () => {
      const response = (await fetchMedicalDevices()) as any;
      setMedicalDevices(response.data.response);
    })();
  }, []);

  return (
    <Fragment>
      <h3>Medical Devices</h3>
      <pre>{JSON.stringify(medicalDevices, null, 2)}</pre>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalDevices &&
            medicalDevices.map((device: Device) => {
              return (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>
                    <Link
                      to={`/private/${PrivateRoutes.MEDICAL_DEVICES}/${device.id}`}
                    >
                      <AiFillDelete />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default MedicalDevices;
