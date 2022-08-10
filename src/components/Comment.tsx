import { Box, Heading } from "@chakra-ui/react";
import { FC, useState } from "react";

import Comments from "./Comments";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  postName: string;
  comment: any;
};

const Comment: FC<Props> = ({ postName, comment }) => {
  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue">
      <Heading size={"sm"}>{comment["data"]["author"]}</Heading>
      <Box>
        <SanitizeHTML dirty={comment["data"]["body_html"]} />
      </Box>
      <Box>{comment["data"]["score"]}</Box>
      <Box>{comment["data"]["depth"]}</Box>
      {comment["data"]["replies"] && (
        <Box pl={2}>
          <Comments
            postName={postName}
            initialComments={comment["data"]["replies"]}
          />
        </Box>
      )}
    </Box>
  );
};

export default Comment;
