import styled from "@emotion/styled";
import React from "react";

interface IHeaderProps {
  children?: string;
  backButton?: boolean;
}

const Header = ({ children = "", backButton = false }: IHeaderProps) => {
  const HeaderWrapper = styled.div`
    position: fixed;
    width: 100%;
    padding: 16px 0;
    background-color: #ff6388;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: ${backButton ? "start" : "center"};
    gap: 12px;
  `;
  const HeaderContentWrapper = styled.div`
    width: 100%;
    padding: 0 16px;
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: ${backButton ? "start" : "center"};
    gap: 12px;
  `;
  const BackButtonWrapper = styled.div`
    cursor: ${backButton ? "pointer" : "default"};
  `;
  const handleBack = (e: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    window?.history?.back();
  };
  return (
    <HeaderWrapper>
      <HeaderContentWrapper>
        {backButton && (
          <BackButtonWrapper
            onClick={(e: React.MouseEvent<HTMLElement>) => handleBack(e)}
          >
            {"<"}
          </BackButtonWrapper>
        )}
        <div>{children}</div>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};

export default Header;
