import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

import { getElapsedString } from "../lib/utils/getElapsedString";
import Comments from "./Comments";
import RedditAvatar from "./RedditAvatar";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  postName: string;
  comment: any;
};

const Comment: FC<Props> = ({ postName, comment }) => {
  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue" w="full">
      <RedditAvatar username={comment["data"]["author"]} />
      <Heading size="xs">
        {comment["data"]["author"]}
        {" - " + getElapsedString(comment["data"]["created_utc"])}
        {comment["data"]["edited"] &&
          " - " + `edited ${getElapsedString(comment["data"]["edited"])}`}
      </Heading>
      <Box>
        <SanitizeHTML dirty={comment["data"]["body_html"]} />
      </Box>
      <Box>{comment["data"]["score"]}</Box>
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
