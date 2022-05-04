import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  gap: 12px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SectionWrapper = styled.div`
  display: grid;
  gap: 4px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const AddToCollectionLogo = styled.div`
  padding: 0 4px;
  border: 2px solid #ff6388;
  color: #ff6388;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ModalContentWrapper = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
`;

export const CardAddCollection = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const InputCollection = styled.input`
  font-size: 12px;
  outline: none;
  border: 0;
  padding: 0;
`;

export const ClickableFont = styled.div`
  font-size: 12px;
  color: #ff6388;
  cursor: pointer;
`;
