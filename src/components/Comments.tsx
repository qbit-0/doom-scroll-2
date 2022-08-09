import { Stack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import Comment from "./Comment";
import More from "./More";

type Props = {
  initialComments: any;
};

const Comments: FC<Props> = ({ initialComments }) => {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);

  const linkId = `t3_${router.query["postId"]}`;

  const genHandleClickMore = (more: any) => {
    return async () => {
      const moreResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: "/api/morechildren",
        query: {
          api_type: "json",
          link_id: linkId,
          children: more["data"]["children"].join(","),
        },
      });

      console.log(moreResponse.data["json"]["data"]["things"]);

      setComments({
        ...comments,
        data: {
          ...comments["data"],
          children: [
            ...comments["data"]["children"].filter(
              (comment: any) => comment !== more
            ),
            ...moreResponse.data["json"]["data"]["things"],
          ],
        },
      });
    };
  };

  return (
    <Stack>
      {comments.data.children.map((comment: any, index: number) => {
        if (comment["kind"] === "more") {
          return (
            <More
              more={comment}
              handleClickMore={genHandleClickMore(comment)}
              key={index}
            />
          );
        }
        return <Comment comment={comment} key={index} />;
      })}
    </Stack>
  );
};

export default Comments;
