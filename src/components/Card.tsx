import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  disabled?: boolean | null;
  children?: React.ReactNode;
} & BoxProps;

const Card: FC<Props> = ({ disabled = false, children, ...innerProps }) => {
  return (
    <Box
      bgColor={"white"}
      borderWidth={1}
      borderColor="red"
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
