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
   * Propriedade usada para identificar a entrada, também é usada no atributo "name".
   */
  registerField: Path<any>;
  /**
   * Propriedade usada para definir o espaço reservado da entrada.
   */
  placeholder?: string;
  /**
   * O conteúdo do texto auxiliar.
   */
  helperText?: string;
  /**
   * Matriz de erro gerada pela biblioteca React Hook Form. Usado para renderizar o erro de entrada, se houver algum.
   */
  errors: FieldErrors<any>;
}

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
