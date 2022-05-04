import styled from "@emotion/styled";

export const BackdropWrapper = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1010;
`;

export const Content = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 1020;
  display: flex;
  align-items: center;
  justify-content: center;
`;
