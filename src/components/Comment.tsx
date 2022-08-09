import { Box, Heading } from "@chakra-ui/react";
import { FC, useState } from "react";
import Comments from "./Comments";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  comment: any;
};

const Comment: FC<Props> = ({ comment }) => {
  const commentData = comment.data;

  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue">
      <Heading size={"sm"}>{commentData["author"]}</Heading>
      <Box>
        <SanitizeHTML dirty={commentData["body_html"]} />
      </Box>
      <Box>{commentData["score"]}</Box>
      <Box>{commentData["depth"]}</Box>
      {commentData["replies"] && (
        <Box pl={2}>
          <Comments initialComments={commentData["replies"]} />
        </Box>
      )}
    </Box>
  );
};

export default Comment;
