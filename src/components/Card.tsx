import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Card: FC<Props> = ({ children }) => {
  return (
    <Box borderWidth={1} borderColor="red" w="full" rounded="md">
      {children}
    </Box>
  );
};

export default Card;
