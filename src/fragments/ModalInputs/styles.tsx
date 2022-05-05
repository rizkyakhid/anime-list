import styled from "@emotion/styled";

export const ModalWrapper = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputCollection = styled.input`
  font-size: 12px;
  outline: none;
  border: 0;
  padding: 0px 0px 8px;
  border-radius: 0px;
  border-bottom: 1px solid #828282;
  &:focus {
    border-bottom: 1px solid #12b872;
  }
`;
