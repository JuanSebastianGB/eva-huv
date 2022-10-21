import { Service, urlPaths } from '@/models';
import axios from 'axios';

export const servicesBaseUrl = urlPaths.BASE_SERVICES;
export const singleServiceUrl = `${servicesBaseUrl}/`;

export const fetchAxiosServices = () => {
  const controller = new AbortController();
  const { signal } = controller;
  // const response = await axiosRequest({
  //   url: urlPaths.BASE_SERVICES,
  //   headers: {
  //     'x-access-token': getLocalStorage('x-access-token')
  //       ? getLocalStorage('x-access-token')
  //       : null,
  //   },
  // });
  // return response;

  return {
    call: axios.get<Service[]>(urlPaths.BASE_SERVICES, { signal }),
    controller: controller,
  };
};

export const fetchServices = async () => {
  try {
    const data = await fetch(`${servicesBaseUrl}`);
    return await data.json();
  } catch (error) {
    console.error(error);
  }
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

export const fetchUpdateService = async (
  serviceToUpdate: any,
  id: number
): Promise<any> => {
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
