import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

interface IAnchorProps {
  link?: string;
  children?: React.ReactNode | string;
}

const Anchor = ({ link = "/", children = "" }: IAnchorProps) => {
  const WrappedLink = styled(Link)`
    text-decoration: none;
  `;

  return <WrappedLink to={link}>{children}</WrappedLink>;
};

export default Anchor;
