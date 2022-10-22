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
