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
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box
      display={disabled && hideFilteredContent ? "none" : "block"}
      bgColor={disabled && changeBgWhenDisabled ? "black" : bgColor}
      borderWidth={1}
      borderColor="gray.500"
      rounded="md"
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
