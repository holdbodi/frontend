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
  primary: "bg-primary text-cream/85 border-ink hover:bg-primary-dark disabled:opacity-50",
  secondary:
    "bg-secondary text-ink border-ink shadow-[4px_4px_0_var(--color-ink)] hover:bg-secondary-dark disabled:opacity-50",
  outline: "border-ink text-ink bg-transparent hover:bg-ink/5 disabled:opacity-50",
  ghost: "border-transparent text-ink hover:bg-ink/5 disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-[54px] px-10 text-base",
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
        "inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] font-semibold font-body transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed",
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
