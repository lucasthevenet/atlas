import { cn } from "./utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-slate-100 dark:bg-slate-900 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
