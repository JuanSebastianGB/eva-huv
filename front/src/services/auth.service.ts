import { urlPaths } from '@/models';
import { axiosInterceptor, controller } from '@/utilities';

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

// export const fetchAxiosLogin = async (data: any) =>
//   await axiosInterceptor.post(urlPaths.BASE_LOGIN, { ...data });
export const fetchAxiosLogin = (data: any) => ({
  call: axiosInterceptor.post(urlPaths.BASE_LOGIN, { ...data }),
  controller,
});

export const fetchAxiosTokenValidation = async () =>
  await axiosInterceptor.get(urlPaths.TOKEN_VALIDATION);
