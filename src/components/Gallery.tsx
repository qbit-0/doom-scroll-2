import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC } from "react";

import ImagePreview from "./ImagePreview";

type Props = {
  srcs: string[];
} & BoxProps;

const Gallery: FC<Props> = ({ srcs, ...innerProps }) => {
  return (
    <Box
      w="full"
      overflowX="auto"
      overflowY="clip"
      whiteSpace="nowrap"
      {...innerProps}
    >
      {srcs.map((src, index) => {
        return (
          <ImagePreview
            src={src}
            href={src}
            display="inline-flex"
            h="96"
            maxW="95%"
            key={index}
          />
        );
      })}
    </Box>
  );
};

export default Gallery;
