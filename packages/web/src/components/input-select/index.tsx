import React from "react";
import {
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  SelectProps,
} from "@material-ui/core";

type OptionValue = {
  label: string;
  value: string | number;
};

type InputSelectProps = SelectProps & {
  label: string;
  options: OptionValue[];
  errorMessage?: string;
};

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  value,
  name,
  errorMessage,
  error,
  className,
  margin,
  style,
  fullWidth = true,
  ...rest
}) => {
  return (
    <FormControl
      margin={margin}
      fullWidth={fullWidth}
      error={error}
      className={className}
      style={style}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select {...rest} name={name} value={value}>
        <option aria-label="None" value="" />
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default InputSelect;
