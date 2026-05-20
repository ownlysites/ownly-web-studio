import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-[var(--line)] bg-white/85 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
