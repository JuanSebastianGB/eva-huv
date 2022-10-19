import { Service } from '@/models';
import { useServicesContext } from '../../context';
import { ServicesTableRow } from '../ServicesTableRow';
export interface ServicesTableInterface {}

const ServicesTable = () => {
  const { listServices } = useServicesContext() as any;
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listServices &&
          listServices.map((service: Service) => (
            <ServicesTableRow key={service.id} service={service} />
          ))}
      </tbody>
    </table>
  );
};

export default ServicesTable;
