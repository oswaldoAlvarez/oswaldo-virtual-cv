import { createElement, type HTMLAttributes, type ReactNode } from "react";

type HeadingVariant = "hero" | "section" | "card";
type HeadingTag = "h1" | "h2" | "h3" | "h4";

type TextVariant = "body" | "muted" | "caption" | "label";
type TextTag = "p" | "span" | "li";

const headingVariantClass: Record<HeadingVariant, string> = {
  hero: "text-4xl font-extrabold tracking-tight sm:text-5xl",
  section: "text-2xl font-bold",
  card: "text-lg font-semibold",
};

const textVariantClass: Record<TextVariant, string> = {
  body: "text-sm text-slate-300",
  muted: "text-xs text-slate-400",
  caption: "text-xs text-slate-300",
  label: "text-sm font-medium text-emerald-300",
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingTag;
  children: ReactNode;
  variant?: HeadingVariant;
};

export function Heading({
  as = "h2",
  children,
  className,
  variant = "section",
  ...props
}: HeadingProps) {
  return createElement(
    as,
    {
      className: joinClassNames(headingVariantClass[variant], className),
      ...props,
    },
    children,
  );
}

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextTag;
  children: ReactNode;
  variant?: TextVariant;
};

export function Text({
  as = "p",
  children,
  className,
  variant = "body",
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      className: joinClassNames(textVariantClass[variant], className),
      ...props,
    },
    children,
  );
}
