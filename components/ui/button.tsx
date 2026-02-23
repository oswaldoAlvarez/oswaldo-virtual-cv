import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-500 text-slate-950 hover:bg-emerald-400 dark:hover:bg-emerald-400",
  secondary: "portfolio-btn-secondary",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs font-semibold",
  md: "px-5 py-3 text-sm font-semibold",
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  size = "md",
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={joinClassNames(
        "rounded-full transition",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  rel?: string;
  size?: ButtonSize;
  target?: string;
  variant?: ButtonVariant;
};

export function ButtonLink({
  children,
  className,
  href,
  rel,
  size = "md",
  target,
  variant = "secondary",
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        rel={rel}
        target={target}
        className={joinClassNames(
          "rounded-full transition",
          variantClass[variant],
          sizeClass[size],
          className,
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={joinClassNames(
        "rounded-full transition",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
