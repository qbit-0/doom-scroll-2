import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";
import sanitizeHtml from "sanitize-html";

type Props = {
  dirty: string;
} & BoxProps;

const SanitizeHTML: FC<Props> = ({ dirty, ...boxProps }) => {
  return (
    <Box
      wordBreak="break-word"
      textOverflow="ellipsis"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(dirty, {
          allowedTags: [...sanitizeHtml.defaults.allowedTags, "iframe"],
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            iframe: ["src"],
          },
        }),
      }}
      {...boxProps}
    />
  );
};

export default SanitizeHTML;
