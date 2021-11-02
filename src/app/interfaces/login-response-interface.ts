export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}
