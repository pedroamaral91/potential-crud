import React from "react";
import { Grid, GridProps, TextField, TextFieldProps } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

type FormTextFieldType = TextFieldProps & {
  label: string;
  name: string;
  styleField?: CSSProperties;
  styleTypography?: CSSProperties;
  gridConfig?: GridProps;
  inputConfig?: React.ComponentPropsWithRef<"input">;
  errorMessage?: string;
};

const FormTextField: React.FC<FormTextFieldType> = ({
  label,
  name,
  styleField,
  gridConfig,
  errorMessage,
  ...textFieldProps
}) => (
  <Grid item {...gridConfig}>
    <TextField
      name={name}
      label={label}
      error={!!errorMessage}
      style={styleField}
      {...textFieldProps}
    />
  </Grid>
);

export default FormTextField;
