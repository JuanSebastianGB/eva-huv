export const servicesBaseUrl = 'http://localhost:5000/services';
export const singleServiceUrl = `${servicesBaseUrl}/`;

export const fetchServices = async () => {
  const data = await fetch(`${servicesBaseUrl}`);
  return await data.json();
};

export const fetchCreateService = async (serviceToCreate: any) => {
  const objectRequest = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceToCreate),
  };
  try {
    const response = await fetch(servicesBaseUrl, objectRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateService = async (serviceToUpdate: any, id: number) => {
  const objectRequest = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceToUpdate),
  };
  try {
    const response = await fetch(`${servicesBaseUrl}/${id}`, objectRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteService = async (id: number) => {
  const objectRequest = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(`${servicesBaseUrl}/${id}`, objectRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOneService = async (id: number) => {
  const objectRequest = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(`${servicesBaseUrl}/${id}`, objectRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
