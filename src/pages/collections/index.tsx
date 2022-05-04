import React from "react";
import { Box, Header } from "../../components";
import CollectionsContainer from "../../containers/Collections/Collections";

const Collections = () => {
  return (
    <>
      <Header>Ani-Collections</Header>
      <Box header>
        <CollectionsContainer />
      </Box>
    </>
  );
};

export default Collections;
