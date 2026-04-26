import { AnchorHTMLAttributes } from "react";

interface BtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
}

export default function Btn({ variant = "primary", className = "", children, ...props }: BtnProps) {
  return (
    <a className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`} {...props}>
      {children}
    </a>
  );
}
