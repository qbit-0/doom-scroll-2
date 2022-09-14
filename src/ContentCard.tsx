import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = { children: React.ReactNode; boxProps?: BoxProps };

const ContentCard: FC<Props> = ({ children, boxProps }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Box
      w="full"
      borderTopWidth={1}
      borderBottomWidth={1}
      borderLeftWidth={[0, 0, 1]}
      borderRightWidth={[0, 0, 1]}
      p="4"
      shadow="md"
      borderColor="gray.500"
      bgColor={bgColor}
      boxShadow="md"
      overflow="hidden"
      rounded={["none", "none", "md"]}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default ContentCard;
