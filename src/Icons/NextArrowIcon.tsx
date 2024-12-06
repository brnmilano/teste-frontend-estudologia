interface Props {
  size?: number;
  color?: string;
}

export default function NextArrowIcon({
  size = 18,
  color = "#7D8DA6",
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
        d="M13 11.5L17 6.5L13.3636 1.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1 6.5H16.278"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
