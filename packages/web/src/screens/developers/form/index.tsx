import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../../components/input";
import { Developer, SanitizedData } from "../@types";
import InputSelect from "../../../components/input-select";

import { ButtonLoaderContainer, useStyles } from "./styles";

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
  title: string;
  defaultValues: Partial<Developer>;
  onSave: (data: SanitizedData) => void;
  slotUpdateDeveloperButton?: React.ReactNode;
  loading: boolean;
};

const sexOptions = [
  { label: "MASCULINO", value: "M" },
  { label: "FEMININO", value: "F" },
];

const DeveloperForm: React.FC<DeveloperFormProps> = ({
  defaultValues,
  title,
  onSave,
  slotUpdateDeveloperButton,
  loading,
}) => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const sanitizeData = useCallback(
    (data: Developer) => {
      const sanitizedData = {
        ...data,
        date_of_birth: data.date_of_birth.toISOString(),
      };
      onSave(sanitizedData);
    },
    [onSave]
  );

  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12} sm={12}>
        <Paper elevation={1} variant="outlined">
          <Box px={15} py={5}>
            <Box mb={5}>
              <Typography variant="h4" align="center" gutterBottom>
                {title}
              </Typography>
              <Divider />
            </Box>
            <Grid>
              <form onSubmit={handleSubmit(sanitizeData)}>
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
                <Box mt={3} style={{ display: "flex" }}>
                  <ButtonLoaderContainer>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginRight: "10px" }}
                      disabled={loading}
                      endIcon={
                        loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )
                      }
                    >
                      Salvar
                    </Button>
                  </ButtonLoaderContainer>
                  <ButtonLoaderContainer>
                    {slotUpdateDeveloperButton}
                  </ButtonLoaderContainer>
                </Box>
              </form>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DeveloperForm;
