import { Services } from '@/pages';
import { useSelector } from 'react-redux';
import './App.css';
import { AppStore, Service } from './models';

function App() {
  const servicesState: Service[] = useSelector(
    (store: AppStore): Service[] => store.services
  );
  return (
    <div className="App">
      <Services />
    </div>
  );
}

export default App;
