import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--line)] bg-white/85 px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-slate-text/60 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full resize-y rounded-xl border border-[var(--line)] bg-white/85 px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-slate-text/60 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
