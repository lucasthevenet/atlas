import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold shadow-xs transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: [],
        secondary: [],
        tertiary: [],
        link: [],
      },
      size: {
        sm: "gap-2 px-3.5 py-2 text-sm",
        md: "gap-2 py-2.5 px-4 text-sm",
        lg: "gap-2 py-2.5 px-[18px] text-md",
        xl: "gap-2 py-3 px-5 text-md",
        "2xl": "gap-3 py-3.5 px-6 text-lg",
      },
      color: {
        gray: [],
        color: [],
      },
      destructive: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        destructive: false,
        className:
          "border border-primary-600 bg-primary-600 text-white hover:bg-primary-700 hover:border-primary-700 focus-visible:ring-4 focus-visible:ring-primary-100 disabled:bg-primary-200 disabled:border-primary-200",
      },
      {
        variant: "primary",
        destructive: true,
        className:
          "border border-error-600 bg-error-600 text-white hover:bg-error-700 hover:border-error-700 focus-visible:ring-4 focus-visible:ring-error-100 disabled:bg-error-200 disabled:border-error-200",
      },
      {
        variant: "secondary",
        color: "gray",
        destructive: false,
        className:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-4 focus-visible:ring-gray-100 disabled:bg-white disabled:border-gray-200 disabled:text-gray-300",
      },
      {
        variant: "secondary",
        color: "gray",
        destructive: true,
        className:
          "border border-error-300 bg-white text-error-700 hover:bg-error-50 hover:text-error-800 focus-visible:ring-4 focus-visible:ring-error-100 disabled:bg-white disabled:border-error-200 disabled:text-error-300",
      },
      {
        variant: "secondary",
        color: "color",
        destructive: false,
        className:
          "border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800 focus-visible:ring-4 focus-visible:ring-primary-100 disabled:bg-primary-25 disabled:border-primary-25 disabled:text-primary-300",
      },
      {
        variant: "secondary",
        color: "color",
        destructive: true,
        className:
          "border border-error-200 bg-error-50 text-error-700 hover:bg-error-100 hover:text-error-800 focus-visible:ring-4 focus-visible:ring-error-100 disabled:bg-error-25 disabled:border-error-25 disabled:text-error-300",
      },
      {
        variant: "tertiary",
        color: "gray",
        destructive: false,
        className:
          "text-gray-600 hover:bg-gray-50 hover:text-gray-700 disabled:text-gray-300",
      },
      {
        variant: "tertiary",
        color: "gray",
        destructive: true,
        className:
          "text-error-700 hover:bg-error-50 hover:text-error-800 disabled:text-error-300",
      },
      {
        variant: "tertiary",
        color: "color",
        destructive: false,
        className:
          "text-primary-700 hover:bg-primary-50 hover:text-primary-800 disabled:text-gray-300",
      },
      {
        variant: "tertiary",
        color: "color",
        destructive: true,
        className:
          "text-error-700 hover:bg-error-50 hover:text-error-800 disabled:text-error-300",
      },
      {
        variant: "link",
        className: "py-0 px-0 underline-offset-4 shadow-none focus-visible:underline",
      },
      {
        variant: "link",
        color: "gray",
        destructive: false,
        className: "text-gray-600 hover:text-gray-700 disabled:text-gray-300",
      },
      {
        variant: "link",
        color: "gray",
        destructive: true,
        className:
          "text-error-700 hover:text-error-800 disabled:text-error-300",
      },
      {
        variant: "link",
        color: "color",
        destructive: false,
        className:
          "text-primary-700 hover:text-primary-800 disabled:text-gray-300",
      },
      {
        variant: "link",
        color: "color",
        destructive: true,
        className:
          "text-error-700 hover:text-error-800 disabled:text-error-300",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      destructive: false,
      color: "color",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, destructive, asChild = false, color, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, destructive, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
