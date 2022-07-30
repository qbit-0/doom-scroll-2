import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <NavBar />
      {children}
    </Box>
  );
};

export default Layout;
