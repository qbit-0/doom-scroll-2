import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

import NavBar from "./NavBar";

type Props = {
  additionalNav?: React.ReactNode;
  children: React.ReactNode;
};

const NavFrame: FC<Props> = ({ additionalNav, children }) => {
  return (
    <>
      <Box position="sticky" top="0" zIndex="10">
        <NavBar additionalNav={additionalNav} />
      </Box>
      {children}
    </>
  );
};

export default NavFrame;
