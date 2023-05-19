import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-800 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 dark:bg-gray-50 hover:bg-gray-900/80 dark:hover:bg-gray-50/80 border-transparent text-gray-50 dark:text-gray-900",
        secondary:
          "bg-gray-100 dark:bg-gray-900 hover:bg-gray-100/80 dark:hover:bg-gray-900/80 border-transparent text-gray-900 dark:text-gray-50",
        destructive:
          "bg-red-600 dark:bg-red-900 hover:bg-red-600/80 dark:hover:bg-red-900/80 border-transparent text-gray-50 dark:text-gray-50",
        outline: "text-gray-900 dark:text-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
