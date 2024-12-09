import {
  Box,
  Modal as ModalMUI,
  ModalProps as ModalMUIProps,
} from "@mui/material";
import styles from "./styles.module.scss";

export type ModalProps = ModalMUIProps & {
  borderRadius?: string;
  backgroundColor?: string;
};

export default function Modal({
  backgroundColor = "#ffffff",
  borderRadius = "50px",
  children,
  open,
  sx,
  ...rest
}: ModalProps) {
  const centerModalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "85px",
    width: "70%",
    fontFamily: "Chivo, sans-serif",
  };

  return (
    <ModalMUI sx={{ margin: "16px", outline: "none" }} open={open} {...rest}>
      <Box
        sx={{
          ...centerModalStyle,
          backgroundColor,
          borderRadius,
          outline: "none",
          textAlign: "center",
          ...sx,
        }}
      >
        {children}
      </Box>
    </ModalMUI>
  );
}
