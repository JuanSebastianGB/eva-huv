import { Service } from '@/models';
import { fetchOneService, fetchUpdateService } from '@/services';
import { useEffect, useState } from 'react';
import { useServicesContext } from '../../context';
export interface FormUpdateServiceInterface {}

const FormUpdateService = () => {
  const { idState } = useServicesContext() as any;
  const { serviceId, setServiceId } = idState;
  const { servicesState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const [name, setName] = useState('');

  const handleUpdateService = async (e: any): Promise<void> => {
    e.preventDefault();
    await fetchUpdateService({ name }, serviceId);
    const updatedListServices = listServices.map((service: Service) => {
      return service.id === serviceId ? { ...service, name } : service;
    });
    setListServices(updatedListServices);
    setServiceId(0);
  };
  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const serviceFound = await fetchOneService(serviceId);
      const { response } = serviceFound;
      setName(response.name);
    })();
  }, [idState]);

  return (
    <form action="" onSubmit={handleUpdateService}>
      <label htmlFor="">
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <button>Update Service</button>
    </form>
  );
};

export default FormUpdateService;
