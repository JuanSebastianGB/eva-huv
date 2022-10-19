import { Services, ServicesProvider } from '@/pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <ServicesProvider>
        <Services />
      </ServicesProvider>
    </div>
  );
}

export default App;
