import { Stack } from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";

import { genCommentTrees } from "../lib/reddit/redditDataStructs";
import Comment from "./Comment";
import More from "./More";

type Props = {
  postName: string;
  initialComments: any;
};

const Comments: FC<Props> = ({ postName, initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const genHandleClickMore = (more: any) => {
    return async () => {
      const moreResponse = await axios.post("/api/reddit", {
        method: "POST",
        path: "/api/morechildren",
        query: {
          api_type: "json",
          id: more["data"]["id"],
          link_id: postName,
        },
        data: new URLSearchParams({
          children: more["data"]["children"].join(","),
        }).toString(),
      });

      const newComments = {
        ...comments,
        data: {
          ...comments["data"],
          children: [
            ...comments["data"]["children"].filter(
              (comment: any) => comment !== more
            ),
            ...genCommentTrees(moreResponse.data["json"]["data"]["things"]),
          ],
        },
      };

      setComments(newComments);
    };
  };

  return (
    <Stack>
      {comments["data"]["children"].map((comment: any, index: number) => {
        if (comment["kind"] === "more") {
          return (
            <More
              more={comment}
              handleClickMore={genHandleClickMore(comment)}
              key={index}
            />
          );
        }
        return <Comment postName={postName} comment={comment} key={index} />;
      })}
    </Stack>
  );
};

export default Comments;
