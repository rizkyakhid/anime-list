import React from "react";
import { Link } from "react-router-dom";
import { Box } from "../styles";

const Home = () => {
  return (
    <Box>
      <div>INI HOME YGY</div>
      <Link to="/detail">Detail</Link>
    </Box>
  );
};

export default Home;
