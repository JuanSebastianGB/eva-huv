export const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) as string);

export const deleteFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);
