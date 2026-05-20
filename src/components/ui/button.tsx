import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-extrabold uppercase tracking-[0.08em] text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white shadow-[0_14px_34px_rgb(11_37_69_/_0.18)] hover:-translate-y-px hover:shadow-[0_18px_44px_rgb(11_37_69_/_0.24)]",
        gold: "bg-gold text-navy shadow-[0_16px_40px_rgb(197_160_90_/_0.28)] hover:-translate-y-px hover:bg-gold-light",
        secondary: "border border-[var(--line)] bg-white/72 text-navy backdrop-blur-sm hover:border-gold hover:shadow-[0_16px_38px_rgb(11_37_69_/_0.08)]",
        ghost: "text-navy hover:bg-cloud",
        outlineLight: "border border-white/30 bg-white/8 text-white backdrop-blur-sm hover:border-gold-light hover:bg-white/12",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-13 px-7 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
