import { ServicesTableBody, ServicesTableHead } from './components';
export interface ServicesTableInterface {}

const ServicesTable = () => {
  return (
    <table>
      <ServicesTableHead />
      <ServicesTableBody />
    </table>
  );
};

export default ServicesTable;
