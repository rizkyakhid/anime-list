import React from "react";
import { Anchor, Box, Font, Header } from "../../components";

const Detail = () => {
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
