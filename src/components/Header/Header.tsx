import styled from "@emotion/styled";
import React from "react";

interface IHeaderProps {
  children?: string;
  backButton?: boolean;
}

const Header = ({ children = "", backButton = false }: IHeaderProps) => {
  const HeaderWrapper = styled.div`
    background-color: #ff6388;
    padding: 16px;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: ${backButton ? "start" : "center"};
    gap: 12px;
  `;
  const handleBack = (e: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    window?.history?.back();
  };
  return (
    <HeaderWrapper>
      {backButton && (
        <div onClick={(e: React.MouseEvent<HTMLElement>) => handleBack(e)}>
          {"<"}
        </div>
      )}
      <div>{children}</div>
    </HeaderWrapper>
  );
};

export default Header;
