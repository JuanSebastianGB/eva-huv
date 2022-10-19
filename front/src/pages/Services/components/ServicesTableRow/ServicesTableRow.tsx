import { Service } from '@/models';
import { fetchDeleteService } from '@/services';
import { AiFillDelete } from 'react-icons/ai';

export interface ServicesTableRowInterface {}

interface Props {
  service: Service;
  setListServices: any;
  listServices: Service[];
}
const ServicesTableRow = ({
  service,
  setListServices,
  listServices,
}: Props) => {
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
