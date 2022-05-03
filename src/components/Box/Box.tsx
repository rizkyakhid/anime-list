import styled from "@emotion/styled";
import React from "react";

interface IBoxProps {
  children: React.ReactNode;
  header?: boolean;
}

const Box = ({ children, header }: IBoxProps) => {
  const BoxWrapper = styled.div`
    font-size: 16px;
    background-color: white;
    padding: ${header ? "66px 16px 16px" : "16px"};
  `;
  return <BoxWrapper>{children}</BoxWrapper>;
};

export default Box;
