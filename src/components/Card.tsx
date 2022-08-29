import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC, useRef } from "react";

type Props = {
  gray?: boolean;
  children?: React.ReactNode;
} & BoxProps;

const Card: FC<Props> = ({ gray = false, children, ...innerProps }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <Box
        ref={ref}
        borderWidth={1}
        borderColor="red"
        w="full"
        rounded="md"
        p="4"
        {...innerProps}
      >
        {children}
      </Box>
      {gray && (
        <Box
          pointerEvents="none"
          position="absolute"
          zIndex={5}
          left={ref.current?.offsetLeft}
          top={ref.current?.offsetTop}
          w={ref.current?.offsetWidth}
          h={ref.current?.offsetHeight}
          bgColor="black"
          opacity="0.5"
          {...innerProps}
        />
      )}
    </Box>
  );
};

export default Card;
