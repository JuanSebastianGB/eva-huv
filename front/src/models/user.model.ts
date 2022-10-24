export const userEmptyState = {
  name: '',
  email: '',
  isLoggedIn: false,
};

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}
