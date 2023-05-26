import { cn } from "../../utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-100 dark:bg-gray-900",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
