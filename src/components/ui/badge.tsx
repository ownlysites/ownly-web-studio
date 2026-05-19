import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-[var(--gold-line)] bg-gold/10 text-gold-deep",
        navy: "border-navy/20 bg-navy/5 text-navy",
        gold: "border-gold bg-gold text-navy",
        green: "border-green-irish/30 bg-green-irish/10 text-green-irish",
        outline: "border-[var(--line)] bg-white/60 text-slate-text",
        light: "border-white/30 bg-white/10 text-white backdrop-blur-sm",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
