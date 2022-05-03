import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

interface ICardProps {
  children?: React.ReactNode | string;
  to?: string;
  onClick?: () => void;
}

const Card = ({ children, to, onClick }: ICardProps) => {
  const CardWrapperLink = styled(Link)`
    background: #ffffff;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    box-shadow: 1px 2px 15px rgba(5, 46, 88, 0.1);
    border-radius: 8px;
    padding: 12px;
    text-decoration: none;
  `;
  const CardWrapperDiv = styled.div`
    background: #ffffff;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    box-shadow: 1px 2px 15px rgba(5, 46, 88, 0.1);
    border-radius: 8px;
    padding: 12px;
  `;
  const handleClick = () => {
    onClick && onClick();
  };
  if (to && to?.length !== 0) {
    return (
      <CardWrapperLink onClick={handleClick} to={to}>
        {children}
      </CardWrapperLink>
    );
  } else {
    return <CardWrapperDiv onClick={handleClick}>{children}</CardWrapperDiv>;
  }
};

export default Card;
