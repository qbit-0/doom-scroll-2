import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC } from "react";

import NavBar from "./NavBar";

type Props = {
  additionalNav?: React.ReactNode;
  children: React.ReactNode;
} & BoxProps;

const NavFrame: FC<Props> = ({ additionalNav, children, ...innerProps }) => {
  return (
    <>
      <Box {...innerProps}>
        <Box position="sticky" top="0" zIndex="10">
          <NavBar additionalNav={additionalNav} />
        </Box>
        {children}
      </Box>
    </>
  );
};

export default NavFrame;
