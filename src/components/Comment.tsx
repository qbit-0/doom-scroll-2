import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  initialComment: any;
};

const Comment: FC<Props> = ({ initialComment }) => {
  const [comment, setComment] = useState(initialComment);

  const commentData = comment.data;

  const handleClickMore = () => {};

  if (comment["kind"] === "more") {
    const count = commentData["count"];
    return (
      <Box>
        {count > 0 ? (
          <Button onClick={handleClickMore}>{`${count} more ${
            count > 1 ? "replies" : "reply"
          }`}</Button>
        ) : (
          <Button>Continue Thread</Button>
        )}
      </Box>
    );
  }

  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue">
      <Heading size={"sm"}>{commentData["author"]}</Heading>
      <Box>
        <SanitizeHTML dirty={commentData["body_html"]} />
      </Box>
      <Box>{commentData["score"]}</Box>
      <Stack pl={2}>
        {commentData["replies"] &&
          commentData["replies"]["data"]["children"].map(
            (reply: any, index: number) => (
              <Comment initialComment={reply} key={index} />
            )
          )}
      </Stack>
    </Box>
  );
};

export default Comment;
