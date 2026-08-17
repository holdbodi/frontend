// src/components/ui/Modal.tsx
import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/format";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* panel */}
      <div
        className={cx(
          "relative w-full max-w-sm rounded-[20px] border-[1.5px] border-ink bg-card p-8 shadow-[6px_6px_0_var(--color-ink)]",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            &times;
          </span>
        </button>

        {title && (
          <h2 className="mb-6 pr-8 font-display text-2xl font-extrabold leading-tight text-ink">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
}