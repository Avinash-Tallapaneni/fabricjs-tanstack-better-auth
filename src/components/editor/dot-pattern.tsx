import { cn } from "@/lib/utils";

// https://ui.aceternity.com/components/grid-and-dot-backgrounds

export function DotPatternStaticBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(currentColor_1px,transparent_1px)]",
        "text-neutral-300 dark:text-neutral-700", // Color of the dots
        className
      )}
    />
  );
}
