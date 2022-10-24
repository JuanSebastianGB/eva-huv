import { useFetchAndLoad } from '@/hooks';
import { Service } from '@/models';
import { useServicesContext } from '@/pages/Private/Services/context';
import { fetchAxiosDeleteService } from '@/services';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';

export interface ServicesTableRowInterface {}

interface Props {
  service: Service;
}
const ServicesTableRow = ({ service }: Props) => {
  const { servicesState, idState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const { setServiceId } = idState;
  const { callEndpoint } = useFetchAndLoad();
  const handleDeleteService = async () => {
    try {
      await callEndpoint(fetchAxiosDeleteService(service.id));
      const EditedServices = listServices.filter(
        (serviceRow: Service): boolean => serviceRow.id !== service.id
      );
      setListServices(EditedServices);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenFormEditService = (): any => setServiceId(service.id);

  return (
    <tr>
      <td>{service.id}</td>
      <td>{service.name}</td>
      <td>
        <button onClick={handleDeleteService}>
          <AiFillDelete color="red" />
        </button>
        <button onClick={handleOpenFormEditService}>
          <AiOutlineEdit color="blue" />
        </button>
      </td>
    </tr>
  );
};

export default ServicesTableRow;
