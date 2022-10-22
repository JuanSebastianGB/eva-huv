import { useFetchAndLoad } from '@/hooks';
import { Service } from '@/models';
import { fetchAxiosOneService, fetchAxiosUpdateService } from '@/services';
import { useEffect, useState } from 'react';
import { useServicesContext } from '../../context';
export interface FormUpdateServiceInterface {}

const FormUpdateService = () => {
  const { idState } = useServicesContext() as any;
  const { serviceId, setServiceId } = idState;
  const { servicesState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const { callEndpoint } = useFetchAndLoad();
  const [name, setName] = useState('');

  const handleUpdateService = async (e: any): Promise<void> => {
    e.preventDefault();

    try {
      await callEndpoint(fetchAxiosUpdateService({ name }, serviceId));
      const updatedListServices = listServices.map(
        (service: Service): Service => {
          return service.id === serviceId ? { ...service, name } : service;
        }
      );
      setListServices(updatedListServices);
    } catch (error) {
      console.log(error);
    }
    setServiceId(0);
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await callEndpoint(fetchAxiosOneService(serviceId));
        setName(response.data.response.name);
      } catch (error) {
        console.log(error);
      }
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
