import { Box, Heading } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  post: Record<string, any>;
};

const Post: FC<Props> = ({ post }) => {
  const postData = post["data"];
  return (
    <Box border="1px">
      <Box>
        <Heading>{postData["title"]}</Heading>
      </Box>
      <Box>{postData["ups"]}</Box>
      <Box>{postData["selftext"]}</Box>
    </Box>
  );
};

export default Post;
