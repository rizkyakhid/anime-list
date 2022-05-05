import styled from "@emotion/styled";
import React from "react";

interface IButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "disabled";
  width?: string | number;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "primary",
  width,
  onClick,
}: IButtonProps) => {
  const ButtonWrapper = styled.button`
    outline: none;
    border: 1px solid
      ${variant === "primary"
        ? "#fff"
        : variant === "secondary"
        ? "#12B872"
        : "#828282"};
    padding: 12px;
    border-radius: 8px;
    background-color: ${variant === "primary" ? "#12B872" : "#f8f8f8"};
    color: ${variant === "primary"
      ? "#fff"
      : variant === "secondary"
      ? "#12B872"
      : "#828282"};
    cursor: ${variant === "disabled" ? "default" : "pointer"};
    font-weight: 600;
    width: ${width};
  `;
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <ButtonWrapper
      disabled={variant === "disabled" ? true : false}
      onClick={handleClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
