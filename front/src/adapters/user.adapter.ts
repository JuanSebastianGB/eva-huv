export const createUserAdapter = (data: any) => {
  return {
    email: data.email,
    password: data.password,
  };
};
