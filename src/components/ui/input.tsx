import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-slate/70 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
