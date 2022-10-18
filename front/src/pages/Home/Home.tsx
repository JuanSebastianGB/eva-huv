import { createServices } from '@/redux/states/servicesSlice';
import { fetchServices } from '@/services';
import React from 'react';
import { useDispatch } from 'react-redux';
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    const services = await fetchServices();
    dispatch(createServices(services));
  };
  return <button onClick={handleClick}>Create services</button>;
};

export default Home;
