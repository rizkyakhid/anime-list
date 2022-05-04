import styled from "@emotion/styled";
import React from "react";

interface IButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled";
}

const Button = ({ children, variant = "primary" }: IButtonProps) => {
  const ButtonWrapper = styled.button`
    outline: none;
    border: 1px solid
      ${variant === "primary"
        ? "#fff"
        : variant === "secondary"
        ? "#ff6388"
        : "#828282"};
    padding: 12px 0;
    border-radius: 8px;
    background-color: ${variant === "primary" ? "#ff6388" : "#f8f8f8"};
    color: ${variant === "primary"
      ? "#fff"
      : variant === "secondary"
      ? "#ff6388"
      : "#828282"};
    cursor: ${variant === "disabled" ? "default" : "pointer"};
    font-weight: 600;
  `;

  return <ButtonWrapper>{children}</ButtonWrapper>;
};

export default Button;
