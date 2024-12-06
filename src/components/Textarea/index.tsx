import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, Control, Path, FieldErrors } from "react-hook-form";
import styles from "./styles.module.scss";

interface ControlledTextFieldProps extends Omit<TextFieldProps, "name"> {
  /**
   * Recebe um objeto <Control> da biblioteca React Hook Form para definir o
   * contexto deste formulário.
   *
   * @type `Control<any>`
   */
  control: Control<any>;
  /**
   * Property used to identify the input, it is also used in the "name" attribute.
   */
  registerField: Path<any>;
  /**
   * Property used to set the placeholder of the input.
   */
  placeholder?: string;
  /**
   * The helper text content.
   */
  helperText?: string;
  /**
   * Error array generated by the React Hook Form library. It is used to render the input error, if there is any
   */
  errors: FieldErrors<any>;
}

/**
 * A controlled TextField component using Material-UI and React Hook Form.
 */
export function ControlledTextField({
  control,
  registerField,
  placeholder,
  helperText,
  ...rest
}: ControlledTextFieldProps) {
  return (
    <Controller
      name={registerField}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          placeholder={placeholder}
          error={!!error}
          helperText={error ? error.message : helperText}
          classes={{ root: styles.textFieldRoot }}
        />
      )}
    />
  );
}