import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  children?: React.ReactNode;
  boxProps?: BoxProps;
};

const Card: FC<Props> = ({ boxProps, children }) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      borderWidth={[0, 0, 1]}
      w="full"
      p="4"
      shadow="md"
      rounded={["none", "none", "md"]}
      borderColor="gray.500"
      bgColor={bgColor}
      boxShadow="md"
      overflow="hidden"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default Card;
