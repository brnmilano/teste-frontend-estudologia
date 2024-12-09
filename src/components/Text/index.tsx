import { Typography, TypographyProps } from "@mui/material";

export default function Text({
  children,
  color = "var(--black)",
  fontSize = 16,
  fontWeight = 400,
  ...rest
}: TypographyProps) {
  return (
    <Typography
      {...rest}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      sx={{
        fontFamily: "var(--font-family)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {children}
    </Typography>
  );
}
