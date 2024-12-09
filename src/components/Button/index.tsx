import {
  Button as ButtonMUI,
  ButtonProps as MaterialButtonProps,
} from "@mui/material";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface ButtonProps extends MaterialButtonProps {
  /**
   * Define o tema do botão.
   */
  theme?: "primary" | "secondary" | "";
  /**
   * Define o tamanho do botão.
   */
  size?: "medium" | "large";
}

export function Button({
  theme = "primary",
  children,
  color = "primary",
  size = "large",
  variant = "outlined",
  disabled,
  ...rest
}: Readonly<ButtonProps>) {
  const outlinedButtonColor = clsx(
    color === "primary" && styles.buttonOutlined,
    color === "secondary" && styles.secondary
  );

  return (
    <ButtonMUI
      {...rest}
      className={`${styles.button} 
      ${theme === "primary" ? styles.primary : theme === "secondary"}  ${
        disabled && styles.buttonDisabled
      }`}
      classes={{
        ...rest.classes,
        outlined: clsx(outlinedButtonColor, rest.classes?.outlined),
        contained: clsx(styles.buttonContained, rest.classes?.contained),
        sizeLarge: clsx(styles.buttonSizeLarge, rest.classes?.sizeLarge),
        sizeMedium: clsx(styles.butonSizeMedium, rest.classes?.sizeMedium),
        text: clsx(styles.buttonText, rest.classes?.text),
      }}
      color={color}
      size={size}
      sx={{ height: 45, whiteSpace: "nowrap", ...rest.sx }}
      variant={variant}
      disabled={disabled}
    >
      <p>{children}</p>
    </ButtonMUI>
  );
}
