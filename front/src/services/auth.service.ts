import { urlPaths } from '@/models';
import { axiosInterceptor } from '@/utilities';

export const baseUrl = 'https://rickandmortyapi.com/api/';
export const characterUrl = `${baseUrl}character/`;

export const fetchCharacter = async () => {
  try {
    const character = await fetch(characterUrl + 2);
    const jsonData = await character.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogin = async (user: any) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...user }),
  };
  try {
    const response = await fetch(urlPaths.BASE_LOGIN, options);
    return await response.json();
  } catch (error) {
    return { error };
  }
};

export const fetchAxiosLogin = async (data: any) =>
  await axiosInterceptor.post(urlPaths.BASE_LOGIN, { ...data });
