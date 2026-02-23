import type { HTMLAttributes, ReactNode } from "react";

type CardRadius = "lg" | "xl";
type CardSize = "md" | "lg";

const radiusClass: Record<CardRadius, string> = {
  lg: "rounded-xl",
  xl: "rounded-2xl",
};

const sizeClass: Record<CardSize, string> = {
  md: "p-4",
  lg: "p-5",
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
  children: ReactNode;
  radius?: CardRadius;
  size?: CardSize;
};

export function Card({
  as = "article",
  children,
  className,
  radius = "xl",
  size = "lg",
  ...props
}: CardProps) {
  const Component = as;

  return (
    <Component
      className={joinClassNames("portfolio-card", radiusClass[radius], sizeClass[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
