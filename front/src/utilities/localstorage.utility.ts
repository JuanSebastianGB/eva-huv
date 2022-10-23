export const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value)
  );

export const getLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch (error) {
    return localStorage.getItem(key);
  }
};

export const deleteFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);
