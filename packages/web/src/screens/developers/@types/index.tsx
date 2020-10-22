export type Developer = {
  name: string;
  age: number;
  id: number;
  sex: string;
  hobby: string;
  date_of_birth: Date;
};

export type SanitizedData = Omit<Developer, "date_of_birth"> & {
  date_of_birth: string;
};

export type AxiosGetResponse = {
  total: number;
  page: number;
  developers: SanitizedData[];
};
