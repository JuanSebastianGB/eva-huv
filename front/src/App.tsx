import { Home } from '@/pages';
import { useSelector } from 'react-redux';
import './App.css';
import { AppStore, Service } from './models';

function App() {
  const servicesState: Service[] = useSelector(
    (store: AppStore): Service[] => store.services
  );
  return (
    <div className="App">
      <Home />
      <pre>{JSON.stringify(servicesState, null, 2)}</pre>
    </div>
  );
}

export default App;
