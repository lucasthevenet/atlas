import * as React from "react";
import { cva } from "class-variance-authority";

import { cn, type NonNullableVariantProps } from "../../utils";

const badgeVariants = cva("inline-flex items-center font-medium", {
  variants: {
    color: {
      gray: "bg-gray-50 border-gray-200 text-gray-700",
      primary: "bg-primary-50 border-primary-200 text-primary-700",
      error: "bg-error-50 border-error-200 text-error-700",
      warning: "bg-warning-50 border-warning-200 text-warning-700",
      success: "bg-success-50 border-success-200 text-success-700",
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
      pink: "bg-pink-50 border-pink-200 text-pink-700",
      orange: "bg-orange-50 border-orange-200 text-orange-700",
    },
    variant: {
      outline: "bg-transparent border-[1.5px] border-current",
      solid: "border",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-sm",
    },
    type: {
      pill: "rounded-full",
      badge: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "outline",
    color: "gray",
    size: "md",
    type: "pill",
  },
});

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> &
  NonNullableVariantProps<typeof badgeVariants>;

function Badge({
  className,
  color,
  variant,
  size,
  type,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ color, variant, size, type, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
