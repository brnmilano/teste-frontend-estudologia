interface Props {
  size?: number;
  color?: string;
  disabled?: boolean;
}

export default function PreviousArrowIcon({
  size = 18,
  color = "#7D8DA6",
  disabled,
}: Readonly<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 1.5L1 6.5L4.63637 11.5"
        stroke={disabled ? "#e3dfef" : color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 6.5L1.72199 6.5"
        stroke={disabled ? "#e3dfef" : color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
