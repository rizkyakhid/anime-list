import React from "react";
import { Box, Header } from "../../components";
import HomeContainer from "../../containers/Home/Home";

const Home = () => {
  return (
    <>
      <Header>Ani-List</Header>
      <Box header>
        <HomeContainer />
      </Box>
    </>
  );
};

export default Home;
