import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--gold-line)] bg-gold/10 text-gold-deep",
        navy: "border-navy/20 bg-navy/5 text-navy",
        gold: "border-gold bg-gold text-navy",
        green: "border-green/20 bg-green/10 text-green",
        outline: "border-[var(--line)] bg-white/60 text-slate",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
