import { Avatar, Box, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import { getElapsedString } from "../lib/utils/getElapsedString";
import Comments from "./Comments";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  postName: string;
  comment: any;
};

const Comment: FC<Props> = ({ postName, comment }) => {
  const [author, setAuthor] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (comment["data"]["author"] !== "[deleted]") {
        const authorResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/user/${comment["data"]["author"]}/about`,
        });
        setAuthor(authorResponse.data);
      }
    })();
  }, [comment]);

  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue">
      <Avatar
        name={comment["data"]["author"]}
        src={author?.["data"]["icon_img"]}
      />
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
