export interface Error {
  status: number;
  errors: [
    {
      code: string;
      message: string;
      field_name: string;
    }
  ];
}
