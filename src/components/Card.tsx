import { Box, useColorModeValue, useStyleConfig } from "@chakra-ui/react";
import React, { FC, useContext } from "react";

import { DisplaySettingsContext } from "../lib/context/DisplaySettingsProvider";

type Props = {
  disabled?: boolean | null;
  changeBgWhenDisabled?: boolean;
  darkenContentWhenDisabled?: boolean;
  children?: React.ReactNode;
};

const Card: FC<Props> = ({
  disabled = false,
  changeBgWhenDisabled = false,
  darkenContentWhenDisabled = false,
  children,
}) => {
  const styles = useStyleConfig("Card");
  const bgColor = useColorModeValue("white", "gray.800");
  const { hideFilteredContent } = useContext(DisplaySettingsContext);

  return (
    <Box
      display={disabled && hideFilteredContent ? "none" : "block"}
      bgColor={disabled && changeBgWhenDisabled ? "black" : bgColor}
      filter={disabled && darkenContentWhenDisabled ? "auto" : "none"}
      brightness={disabled && darkenContentWhenDisabled ? "50%" : "none"}
      boxShadow={disabled ? "none" : "md"}
      __css={styles}
    >
      {children}
    </Box>
  );
};

export default Card;
