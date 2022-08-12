import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

import ImagePreview from "./ImagePreview";

type Props = {
  srcs: string[];
};

const Gallery: FC<Props> = ({ srcs }) => {
  return (
    <Box>
      {srcs.map((src, index) => {
        return (
          <Box key={index}>
            <ImagePreview src={src} href={src} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Gallery;
