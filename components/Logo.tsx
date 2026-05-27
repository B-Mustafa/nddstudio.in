interface LogoProps {
  size?: number;
  variant?: "default" | "on-orange";
}

export default function Logo({ size = 36, variant = "default" }: LogoProps) {
  const bgFill =
    variant === "on-orange" ? "rgba(255,255,255,0.18)" : "#E8630A";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-label="NDD.Studio logo"
    >
      <rect width="44" height="44" rx="10" fill={bgFill} />
      {/* Arrow-N mark */}
      <line x1="11" y1="31" x2="11" y2="13" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="11" y1="13" x2="26" y2="31" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="26" y1="31" x2="26" y2="19" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="26" y1="19" x2="33" y2="13" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="28" y1="13" x2="33" y2="13" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="33" y1="13" x2="33" y2="18" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}
