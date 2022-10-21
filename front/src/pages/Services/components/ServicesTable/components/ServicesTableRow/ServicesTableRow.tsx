import { Service } from '@/models';
import { useServicesContext } from '@/pages/Services/context';
import { fetchDeleteService } from '@/services';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';

export interface ServicesTableRowInterface {}

interface Props {
  service: Service;
}
const ServicesTableRow = ({ service }: Props) => {
  const { servicesState, idState } = useServicesContext() as any;
  const { listServices, setListServices } = servicesState;
  const { setServiceId } = idState;
  const handleDeleteService = async () => {
    const deletedServiceResponse = await fetchDeleteService(service.id);
    const { response } = deletedServiceResponse;
    if (!response.err) {
      const EditedServices = listServices.filter(
        (serviceRow: Service): boolean => serviceRow.id !== service.id
      );
      setListServices(EditedServices);
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
