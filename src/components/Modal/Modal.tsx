import styled from "@emotion/styled";
import React, { useEffect, useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnclickOutside";
import Backdrop from "../Backdrop";

interface IModalProps {
  state?: boolean;
  children?: React.ReactNode;
  onClickOutside?: () => void;
  width?: string | number;
  height?: string | number;
}

const Modal = ({
  state = false,
  children,
  width,
  height,
  onClickOutside,
}: IModalProps) => {
  const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 16px;
    margin: 16px;
    border-radius: 12px;
    width: ${width ? width : ""};
    height: ${height ? height : ""};
  `;
  const modalRef = useRef(document.createElement("div"));
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(modalRef, () => {
    setModalOpen(false);
    if (onClickOutside) {
      onClickOutside();
    }
  });
  useEffect(() => {
    setModalOpen(state);
  }, [state]);
  return isModalOpen ? (
    <Backdrop open={isModalOpen}>
      {isModalOpen && <ModalWrapper ref={modalRef}>{children}</ModalWrapper>}
    </Backdrop>
  ) : (
    <></>
  );
};

export default Modal;
