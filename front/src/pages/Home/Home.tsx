import React from 'react';
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export default Home;
