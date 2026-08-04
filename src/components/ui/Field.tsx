import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/format";

const fieldBase =
  "w-full rounded-xl border-[1.5px] border-ink/20 bg-card px-4 py-3 text-sm font-body text-ink placeholder:text-meta outline-none transition-colors focus:border-ink";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(fieldBase, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cx(fieldBase, "appearance-none bg-card", className)} {...props}>
      {children}
    </select>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, hint, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-mono text-xs uppercase tracking-wide text-ink">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      {children}
      {hint && !error && <span className="text-xs font-body text-meta">{hint}</span>}
      {error && <span className="text-xs font-medium text-red-700">{error}</span>}
    </div>
  );
}
