import React from "react";
// import { useLocation } from "react-router-dom";
import { Anchor, Box, Font, Header } from "../../components";

const Detail = () => {
  // const { search } = useLocation();
  // const id = +search?.slice(4, search?.length);

  return (
    <>
      <Header backButton>Ani-Detail</Header>
      <Box>
        <Font size="sm">INI HALAMAN DETAIL YGY</Font>
        <Anchor link={"/"}>
          <Font size="sm">HELLO</Font>
        </Anchor>
      </Box>
    </>
  );
};

export default Detail;
