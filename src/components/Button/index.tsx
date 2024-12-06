import {
  Button as ButtonMUI,
  CircularProgress,
  ButtonProps as MaterialButtonProps,
} from "@mui/material";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface ButtonProps extends MaterialButtonProps {
  loading?: boolean;
  theme?: "primary" | "secondary";
  size?: "medium" | "large";
}

export function Button({
  theme = "primary",
  children,
  color = "primary",
  size = "large",
  variant = "outlined",
  loading,
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
        startIcon: clsx(styles.startIcon, rest.classes?.startIcon),
        outlined: clsx(outlinedButtonColor, rest.classes?.outlined),
        sizeLarge: clsx(styles.buttonSizeLarge, rest.classes?.sizeLarge),
        sizeMedium: clsx(styles.butonSizeMedium, rest.classes?.sizeMedium),
      }}
      color={color}
      size={size}
      sx={{ height: 45, whiteSpace: "nowrap", ...rest.sx }}
      variant={variant}
      disabled={disabled}
    >
      <p style={{ color: loading ? "transparent" : undefined }}>{children}</p>

      {loading ? (
        <CircularProgress
          className={styles.progressBar}
          size={20}
          color="inherit"
        />
      ) : null}
    </ButtonMUI>
  );
}
