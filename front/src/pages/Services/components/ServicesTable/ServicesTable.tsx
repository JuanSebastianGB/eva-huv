import { useServicesContext } from '../../context';
import { ServicesTableBody, ServicesTableHead } from './components';
export interface ServicesTableInterface {}

const ServicesTable = () => {
  const { listServices } = useServicesContext() as any;
  return (
    <table>
      <ServicesTableHead />
      <ServicesTableBody />
    </table>
  );
};

export default ServicesTable;
