import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/format";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-cream hover:bg-primary-dark disabled:bg-primary/50",
  secondary:
    "bg-secondary text-ink hover:bg-secondary-dark disabled:bg-secondary/50",
  outline:
    "border border-ink/20 text-ink bg-transparent hover:bg-ink/5 disabled:opacity-50",
  ghost: "text-ink hover:bg-ink/5 disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
