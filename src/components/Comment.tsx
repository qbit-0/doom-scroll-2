import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import { getElapsedString } from "../lib/utils/getElapsedString";
import Comments from "./Comments";
import CustomImage from "./CustomImage";
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
        const author = await axios.post("/api/reddit", {
          method: "GET",
          path: `/user/${comment["data"]["author"]}/about`,
        });
        setAuthor(author.data);
      }
    })();
  }, [comment]);

  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue">
      {author !== null ? (
        <CustomImage
          src={author?.["data"]["icon_img"]}
          placeholder="blur"
          alt="author"
          layout="fixed"
          width={32}
          height={32}
        />
      ) : (
        <CustomImage
          src={
            "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
          }
          placeholder="blur"
          alt="author"
          layout="fixed"
          width={32}
          height={32}
        />
      )}
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
