import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  disabled?: boolean | null;
  children?: React.ReactNode;
} & BoxProps;

const Card: FC<Props> = ({ disabled = false, children, ...innerProps }) => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box
      bgColor={bgColor}
      borderWidth={1}
      borderColor="gray.500"
      _hover={{ borderColor: "gray.400" }}
      rounded="md"
      w="full"
      p="4"
      boxShadow={disabled ? "none" : "md"}
      filter={disabled ? "auto" : "none"}
      brightness={disabled ? "50%" : "none"}
      {...innerProps}
    >
      {children}
    </Box>
  );
};

export default Card;
