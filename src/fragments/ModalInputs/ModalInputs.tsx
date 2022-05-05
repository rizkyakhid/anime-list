import React from "react";
import { Button, Font, Modal } from "../../components";
import { ButtonWrapper, InputCollection, ModalWrapper } from "./styles";

interface IModalInputsProps {
  state: boolean;
  inputState: string;
  validation: boolean;
  handleOutside: () => void;
  handleChange: (e: any) => void;
  handleSubmit: () => void;
  placeholder?: string;
  submitButton?: string;
}

const ModalInputs = ({
  state,
  inputState,
  validation,
  handleOutside,
  handleChange,
  handleSubmit,
  placeholder = "Input new collection name",
  submitButton = "ADD COLLECTION",
}: IModalInputsProps) => {
  return (
    <Modal state={state} onClickOutside={handleOutside}>
      <ModalWrapper>
        <React.Fragment>
          <Font weight="bold">New Collection</Font>
          <Font size="xs" weight="semi-bold">
            Collection Name
          </Font>
          <InputCollection
            type="text"
            value={inputState}
            onChange={(e: any) => handleChange(e)}
            autoFocus
            placeholder={placeholder}
          />
          <ButtonWrapper>
            <Button
              variant={validation ? "primary" : "disabled"}
              width={"100%"}
              onClick={handleSubmit}
            >
              {submitButton}
            </Button>
          </ButtonWrapper>
        </React.Fragment>
      </ModalWrapper>
    </Modal>
  );
};

export default ModalInputs;
