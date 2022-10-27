import { PrivateRoutes } from '@/models';
import { fetchMedicalDevices } from '@/services/medicaldevices.service';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  gap: 1.5rem;
  padding: 1rem;
`;

const Card = styled.div`
  width: 300x;
  height: 350px;
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

  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
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
      <Typography variant="h4" align="center">
        Medical Devices
      </Typography>
      <Link to="/private/medicaldevices/insert">
        <Button color="primary" fullWidth variant="contained">
          Insert
        </Button>
      </Link>
      <StyledContainer>
        {medicalDevices &&
          medicalDevices.map((device: Device) => {
            return (
              <Card key={device.id}>
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
