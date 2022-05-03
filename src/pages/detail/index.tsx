import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Header } from "../../components";
import DetailContainer from "../../containers/Detail/Detail";

const Detail = () => {
  const { search } = useLocation();
  const id = +search?.slice(4, search?.length);

  return (
    <>
      <Header backButton>Ani-Detail</Header>
      <Box header>
        <DetailContainer id={id} />
      </Box>
    </>
  );
};

export default Detail;
