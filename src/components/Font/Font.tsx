import styled from "@emotion/styled";
import React from "react";

interface IFontProps {
  children?: string;
  size?: "xs" | "sm" | "md" | "lg";
  weight?: "regular" | "semi-bold" | "bold";
  color?: string;
  align?: "center" | "left" | "right" | "justify";
}

const Font = ({
  children = "",
  size = "sm",
  weight = "regular",
  color = "#333",
  align = "left",
}: IFontProps) => {
  const Wrapper = styled.div`
    font-family: "Gill Sans", sans-serif;
    font-size: ${size === "xs"
      ? "12px"
      : size === "sm"
      ? "16px"
      : size === "md"
      ? "24px"
      : "32px"};
    font-weight: ${weight === "regular"
      ? 500
      : weight === "semi-bold"
      ? 600
      : 700};
    color: ${color};
    text-align: ${align};
  `;
  return <Wrapper>{children}</Wrapper>;
};

export default Font;
