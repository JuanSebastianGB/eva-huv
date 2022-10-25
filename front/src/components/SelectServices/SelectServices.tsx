import { useFetchAndLoad } from '@/hooks';
import { fetchAxiosServices } from '@/services';
import React, { useEffect, useState } from 'react';
export interface SelectServicesInterface {}

const SelectServices: React.FC<SelectServicesInterface> = () => {
  const { callEndpoint } = useFetchAndLoad();
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await callEndpoint(fetchAxiosServices());
      setServices(response.data.response);
    })();
  }, []);
  return (
    <div>
      <select name="" id="" style={{ padding: '1rem', borderRadius: '10px' }}>
        {services &&
          services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectServices;
