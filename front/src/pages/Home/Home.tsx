import React from 'react';
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const handleClick = async () => {
    // const services = await fetchServices();
    // dispatch(createServices(services));
    console.log('home');
  };
  return <button onClick={handleClick}>Create services</button>;
};

export default Home;
