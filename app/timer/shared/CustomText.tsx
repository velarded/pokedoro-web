"use client";

import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
};

export default function CustomText({ style, as: Component = "span", children, ...props }: Props) {
  const baseStyle: React.CSSProperties = { fontFamily: "VT323", display: "inline-block" };
  return (
    // @ts-ignore allow spreading generic html props
    <Component style={{ ...baseStyle, ...style }} {...props}>
      {children}
    </Component>
  );
}
