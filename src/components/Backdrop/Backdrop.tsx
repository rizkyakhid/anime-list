import React from "react";
import { BackdropWrapper, Content } from "./styles";

interface IBackdropProps {
  open?: boolean;
  children?: React.ReactNode;
}

export default function Backdrop({ open = false, children }: IBackdropProps) {
  return (
    <>
      {open && (
        <>
          <BackdropWrapper></BackdropWrapper>
          <Content>{children}</Content>
        </>
      )}
    </>
  );
}
