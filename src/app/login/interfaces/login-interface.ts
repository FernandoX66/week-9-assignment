export interface User {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
