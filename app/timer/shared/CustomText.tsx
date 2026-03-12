"use client";

import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  style?: React.CSSProperties;
  as?: React.ElementType;
  children?: React.ReactNode;
};

export default function CustomText({ style, as: Component = "span", children, ...props }: Props) {
  const baseStyle: React.CSSProperties = { fontFamily: "VT323", display: "inline-block" };
  const Tag = Component as React.ElementType;
  return (
    // Tag is a valid React element type (string or component)
    // @ts-ignore allow spreading generic html props when Tag is dynamic
    <Tag style={{ ...baseStyle, ...style }} {...props}>
      {children}
    </Tag>
  );
}
