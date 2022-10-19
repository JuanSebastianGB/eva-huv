import { Service } from '@/models';
import { ServicesTableRow } from '../ServicesTableRow';
export interface ServicesTableInterface {}

interface Props {
  listServices: Service[];
  setListServices: any;
}

const ServicesTable = (props: Props) => {
  const { listServices } = props;
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
            <ServicesTableRow
              key={service.id}
              service={service}
              setListServices={props.setListServices}
              listServices={listServices}
            />
          ))}
      </tbody>
    </table>
  );
};

export default ServicesTable;
