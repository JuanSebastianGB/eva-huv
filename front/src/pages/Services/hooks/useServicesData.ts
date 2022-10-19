import { fetchServices } from '@/services';
import { useEffect, useState } from 'react';

const useServicesTable = (): any => {
  const [listServices, setListServices] = useState([]);

  useEffect((): void => {
    (async (): Promise<void> => {
      const services = await fetchServices();
      setListServices(services.response);
    })();
  }, []);

  return { listServices, setListServices };
};

export default useServicesTable;
