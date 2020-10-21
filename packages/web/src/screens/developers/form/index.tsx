import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, Button, Box } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../../components/input";
import { Developer } from "../@types";
import InputSelect from "../../../components/input-select";

const validationSchema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  age: yup
    .number()
    .typeError("Somente numeros")
    .required("Campo requerido"),
  date_of_birth: yup
    .date()
    .required("Campo requerido")
    .typeError("Data inválida"),
  hobby: yup.string().required("Campo requerido"),
  sex: yup.string().required("Campo requerido"),
});

type DeveloperFormProps = {
  defaultValues: Partial<Developer>;
};

const sexOptions = [
  { label: "MASCULINO", value: "M" },
  { label: "FEMININO", value: "F" },
];

const DeveloperForm: React.FC<DeveloperFormProps> = ({ defaultValues }) => {
  const { control, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  return (
    <Grid>
      <form onSubmit={handleSubmit(() => {})}>
        <Controller
          as={Input}
          control={control}
          label="Nome"
          name="name"
          margin="normal"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Controller
          as={Input}
          control={control}
          label="Idade"
          name="age"
          margin="normal"
          type="number"
          fullWidth
          error={!!errors.age}
          helperText={errors.age?.message}
        />
        <Controller
          as={InputSelect}
          control={control}
          name="sex"
          label="Sexo"
          options={sexOptions}
          style={{ margin: "16px 0 8px" }}
          error={!!errors.sex}
          errorMessage={errors.sex?.message}
        />
        <Controller
          as={KeyboardDatePicker}
          control={control}
          name="date_of_birth"
          label="Data de nascimento"
          margin="normal"
          fullWidth
          format="dd/MM/yyyy"
          value={defaultValues.date_of_birth}
          invalidDateMessage="Formato de data inválida"
          error={!!errors.date_of_birth}
          helperText={errors.date_of_birth?.message}
          onChange={() => {}}
        />
        <Controller
          as={Input}
          control={control}
          label="Hobby"
          name="hobby"
          margin="normal"
          fullWidth
          error={!!errors.hobby}
          helperText={errors.hobby?.message}
        />
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: "10px" }}
          >
            Salvar
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default DeveloperForm;
