import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-red text-white hover:bg-brand-red-hover shadow-[0_4px_12px_rgba(199,5,18,0.3)] active:scale-[0.98]",
        secondary:
          "bg-surface-raised text-content hover:bg-surface-overlay border border-edge-strong",
        ghost:
          "text-content-muted hover:text-content hover:bg-surface-raised",
        outline:
          "border border-edge-strong bg-transparent text-content hover:bg-surface-raised",
        tonal:
          "bg-data-teal/12 text-data-teal hover:bg-data-teal/18",
        gradient:
          "text-white bg-esg-gradient hover:saturate-150 shadow-[0_6px_20px_rgba(20,184,166,0.3)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(button({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";
