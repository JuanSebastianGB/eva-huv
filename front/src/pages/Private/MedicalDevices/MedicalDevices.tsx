import { PrivateRoutes } from '@/models';
import { fetchMedicalDevices } from '@/services/medicaldevices.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export interface MedicalDevicesInterface {}

interface Device {
  id: number;
  name: string;
}

const StyledContainer = styled.div`
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
`;

const Card = styled.div`
  width: 350x;
  height: 400px;
  display: flex;
  align-items: center;
  border: thin solid gray;
  padding: 1.2rem;
  border-radius: 10px;
  position: relative;

  span {
    margin-right: 5px;
  }
  h3 {
    font-weight: 400;
  }
  .detail {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

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
    <div>
      <h3>Medical Devices</h3>

      <StyledContainer>
        {medicalDevices &&
          medicalDevices.map((device: Device) => {
            return (
              <Card>
                <button className="detail">Detail...</button>
                <span>Id</span>
                <h3>{device.id}</h3>
                <h3>{device.name}</h3>
              </Card>
            );
          })}
      </StyledContainer>
    </div>
  );
};

export default MedicalDevices;
