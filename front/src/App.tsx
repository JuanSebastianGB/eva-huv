import React from 'react';
import './App.css';
import Test from './components/Test/Test';
import { useEffect, useState } from 'react';

const data = [
  {
    id: 1,
    name: 'test1',
  },
  {
    id: 2,
    name: 'test2',
  },
];
function App() {
  const [info, setInfo] = useState([
    {
      name: '',
      id: 0,
      Areas: [],
      Devices: [],
    },
  ]);

  useEffect(() => {
    (async () => {
      const data = await fetch('http://localhost:5000/services');
      const jsonData = await data.json();
      setInfo(jsonData.response);
    })();
  }, []);
  return (
    <div className="App">
      <Test data={info} />
    </div>
  );
}

export default App;
