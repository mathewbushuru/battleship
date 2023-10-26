import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/ui-utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg tracking-widest font-medium disabled:pointer-events-none disabled:opacity-50 uppercase",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-stone-800/90",
        outline:
          "border border-primary text-primary hover:bg-primary hover:text-white ",
      },
      size: {
        default: "h-14 px-4 py-2",
        sm: "h-12 px-3 text-base",
        lg: "h-16 px-8 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface buttonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, buttonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Button;
