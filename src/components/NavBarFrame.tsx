import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

import NavBar from "./NavBar";

type Props = {
  subreddit?: string;
  children: React.ReactNode;
};

const NavBarFrame: FC<Props> = ({ subreddit, children }) => {
  return (
    <>
      <Box position="sticky" top="0" zIndex="10">
        <NavBar subreddit={subreddit} />
      </Box>
      {children}
    </>
  );
};

export default NavBarFrame;
