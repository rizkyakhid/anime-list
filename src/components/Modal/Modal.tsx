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
  // width,
  // height,
  onClickOutside,
}: IModalProps) => {
  const ModalWrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1030;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 16px;
    margin: 16px;
    border-radius: 12px;
  `;
  const modalRef = useRef(null);
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

  return (
    <Backdrop open={isModalOpen}>
      {isModalOpen && <ModalWrapper ref={modalRef}>{children}</ModalWrapper>}
    </Backdrop>
  );
};

export default Modal;
