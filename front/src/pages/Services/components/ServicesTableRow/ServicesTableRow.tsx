import { Service } from '@/models';
import { fetchDeleteService } from '@/services';
import { AiFillDelete } from 'react-icons/ai';
import { useServicesContext } from '../../context';

export interface ServicesTableRowInterface {}

interface Props {
  service: Service;
}
const ServicesTableRow = ({ service }: Props) => {
  const { listServices, setListServices } = useServicesContext() as any;
  const handleDeleteService = async () => {
    const deletedServiceResponse = await fetchDeleteService(service.id);
    const { response } = deletedServiceResponse;
    if (!response.err) {
      const EditedServices = listServices.filter(
        (serviceRow: Service) => serviceRow.id !== service.id
      );
      setListServices(EditedServices);
    }
  };

  return (
    <tr>
      <td>{service.id}</td>
      <td>{service.name}</td>
      <td>
        <button onClick={handleDeleteService}>
          <AiFillDelete />
        </button>
      </td>
    </tr>
  );
};

export default ServicesTableRow;
