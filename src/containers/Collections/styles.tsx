import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  gap: 12px;
`;

export const CardWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: end;
`;

export const Pagination = styled.div`
  border: 1px solid #000;
  border-radius: 8px;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;
`;

export const PaginationDisabled = styled.div`
  border: 1px solid #828282;
  border-radius: 8px;
  padding: 8px;
  font-size: 12px;
  cursor: default;
`;

export const SimpleTabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabActive = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
`;

export const TabInactive = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.img`
  cursor: pointer;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

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
