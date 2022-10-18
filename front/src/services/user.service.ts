export const usersBaseUrl = 'http://localhost:5000/users';
export const singleUserUrl = `${usersBaseUrl}/`;

export const fetchUser = async (id: number) => {
  const data = await fetch(`${singleUserUrl}${id}`);
  return await data.json();
};
