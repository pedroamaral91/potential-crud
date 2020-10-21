type ColumnType = {
  id: string;
  label: string;
  minWidth: number;
  component?: JSX.Element;
};

export const columns: ColumnType[] = [
  { id: "name", label: "Nome", minWidth: 100 },
  { id: "age", label: "Idade", minWidth: 50 },
  { id: "sex", label: "Sexo", minWidth: 50 },
  { id: "date_of_birth", label: "Data de Nascimento", minWidth: 100 },
  { id: "hobby", label: "Hobby", minWidth: 100 },
];
