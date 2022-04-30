import React from "react";
import { Box, Font } from "../../components";
import { LinkWrapper } from "./styles";

const Detail = () => {
  return (
    <Box>
      <Font size="sm">INI HALAMAN DETAIL YGY</Font>
      <LinkWrapper to={"/"}>
        <Font size="sm">HELLO</Font>
      </LinkWrapper>
    </Box>
  );
};

export default Detail;
