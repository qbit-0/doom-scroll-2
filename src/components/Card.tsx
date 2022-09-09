import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React, { FC, useContext } from "react";

import { DisplaySettingsContext } from "../lib/context/DisplaySettingsProvider";

type Props = {
  disabled?: boolean | null;
  changeBgWhenDisabled?: boolean;
  darkenContentWhenDisabled?: boolean;
  children?: React.ReactNode;
} & BoxProps;

const Card: FC<Props> = ({
  disabled = false,
  changeBgWhenDisabled = false,
  darkenContentWhenDisabled = false,
  children,
  ...innerProps
}) => {
  const { hideFilteredContent } = useContext(DisplaySettingsContext);
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      display={disabled && hideFilteredContent ? "none" : "block"}
      bgColor={disabled && changeBgWhenDisabled ? "black" : bgColor}
      borderWidth={[0, 0, 1]}
      rounded={["none", "none", "md"]}
      borderColor="gray.500"
      w="full"
      p="4"
      boxShadow={disabled ? "none" : "md"}
      filter={disabled && darkenContentWhenDisabled ? "auto" : "none"}
      brightness={disabled && darkenContentWhenDisabled ? "50%" : "none"}
      overflow="hidden"
      {...innerProps}
    >
      {children}
    </Box>
  );
};

export default Card;
