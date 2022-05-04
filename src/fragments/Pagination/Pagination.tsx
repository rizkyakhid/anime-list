import styled from "@emotion/styled";
import React from "react";
import Font from "../../components/Font";

interface IPaginationProps {
  value?: number;
  onClick?: (page: number | "prev" | "next") => void;
}

const Pagination = ({ value = 1, onClick }: IPaginationProps) => {
  const PaginationWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: end;
  `;
  const Pagination = styled.div`
    border: 1px solid #000;
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;
  `;
  const PaginationDisabled = styled.div`
    border: 1px solid #828282;
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
    cursor: default;
  `;

  const handleClick = (page: number | "prev" | "next") => {
    onClick && onClick(page);
  };

  return (
    <PaginationWrapper>
      {value !== 1 && (
        <>
          <Pagination onClick={() => handleClick(1)}>
            <Font size="xs">First</Font>
          </Pagination>
          <Pagination onClick={() => handleClick("prev")}>
            <Font size="xs">Prev</Font>
          </Pagination>
          <PaginationDisabled>
            <Font size="xs" color="#828282">
              ...
            </Font>
          </PaginationDisabled>
        </>
      )}
      <Pagination onClick={() => handleClick(value)}>
        <Font size="xs" weight="bold">
          {String(value)}
        </Font>
      </Pagination>
      <PaginationDisabled>
        <Font size="xs" color="#828282">
          ...
        </Font>
      </PaginationDisabled>
      <Pagination onClick={() => handleClick("next")}>
        <Font size="xs">Next</Font>
      </Pagination>
    </PaginationWrapper>
  );
};

export default Pagination;
