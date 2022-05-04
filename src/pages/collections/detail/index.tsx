import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Header } from "../../../components";
import CollectionsDetailContainer from "../../../containers/CollectionsDetail/CollectionsDetail";

const CollectionsDetail = () => {
  const { search } = useLocation();
  const name = search?.slice(6, search?.length);

  return (
    <>
      <Header backButton>Ani-Collections Detail</Header>
      <Box header>
        <CollectionsDetailContainer name={name} />
      </Box>
    </>
  );
};

export default CollectionsDetail;
