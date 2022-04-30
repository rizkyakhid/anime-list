import styled from "@emotion/styled";
import React from "react";

interface IBoxProps {
  children: React.ReactNode;
}

const Box = ({ children }: IBoxProps) => {
  const BoxWrapper = styled.div`
    font-size: 16px;
    background-color: white;
    padding: 16px;
  `;
  return <BoxWrapper>{children}</BoxWrapper>;
};

export default Box;
