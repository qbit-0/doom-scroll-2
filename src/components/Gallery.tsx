import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

import ImagePreview from "./ImagePreview";

type Props = {
  srcs: string[];
};

const Gallery: FC<Props> = ({ srcs }) => {
  return (
    <Box w="full" overflowX="auto" overflowY="clip" whiteSpace="nowrap">
      {srcs.map((src, index) => {
        return (
          <Box display="inline-flex" h="96" maxW="95%" key={index}>
            <ImagePreview src={src} href={src} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Gallery;
