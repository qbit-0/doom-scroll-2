import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC } from "react";

import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
  subreddit?: string;
} & BoxProps;

const NavBarFrame: FC<Props> = ({ subreddit, children, ...innerProps }) => {
  return (
    <Box {...innerProps}>
      <Box position="sticky" top="0" zIndex="10">
        <NavBar subreddit={subreddit} />
      </Box>
      {children}
    </Box>
  );
};

export default NavBarFrame;
