export const servicesBaseUrl = 'http://localhost:5000/services';
export const singleServiceUrl = `${servicesBaseUrl}/`;

export const fetchServices = async () => {
  const data = await fetch(`${servicesBaseUrl}`);
  return await data.json();
};
