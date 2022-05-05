import styled from "@emotion/styled";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

interface IHeaderProps {
  children?: string;
  backButton?: boolean;
}

const Header = ({ children = "", backButton = false }: IHeaderProps) => {
  const HeaderWrapper = styled.div`
    position: fixed;
    width: 100%;
    padding: 16px 0;
    background-color: #12b872;
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
    align-items: center;
    gap: 12px;
  `;
  const handleBack = (e: any) => {
    e?.preventDefault();
    window?.history?.back();
  };
  return (
    <HeaderWrapper>
      <HeaderContentWrapper>
        {backButton && (
          <AiOutlineLeft color="#fff" onClick={(e: any) => handleBack(e)} />
        )}
        <div>{children}</div>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};

export default Header;
