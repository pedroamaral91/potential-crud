export type Developer = {
  name: string;
  age: number;
  id: number;
  sex: string;
  hobby: string;
  date_of_birth: Date;
};

export type AxiosGetResponse = {
  total: number;
  page: number;
  developers: Developer[];
};
