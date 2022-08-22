import { Box } from "@chakra-ui/react";
import { FC } from "react";
import sanitizeHtml from "sanitize-html";

type Props = {
  dirty: string;
};

const SanitizeHTML: FC<Props> = ({ dirty }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(dirty, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["iframe"]),
          allowedAttributes: false,
        }),
      }}
    />
  );
};

export default SanitizeHTML;
