import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import clsx from "clsx";
import styles from "./styles.module.scss";

type Props = {
  className?: string;
};

export default function Container({
  children,
  className,
}: PropsWithChildren<Props>) {
  return <Box className={clsx(styles.container, className)}>{children}</Box>;
}
