import { Box, CSSObject } from "@chakra-ui/react";
import { FC } from "react";
import sanitizeHtml from "sanitize-html";

type Props = {
  dirty: string;
};

const innerHtmlStyle: CSSObject = {
  a: { color: "cyan.500", _hover: { textDecoration: "underline" } },
};

const SanitizeHTML: FC<Props> = ({ dirty }) => {
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
      sx={innerHtmlStyle}
    />
  );
};

export default SanitizeHTML;
