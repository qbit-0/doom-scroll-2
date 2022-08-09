import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { FC, MouseEventHandler, useState } from "react";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  initialComment: any;
};

const Comment: FC<Props> = ({ initialComment }) => {
  const [comment, setComment] = useState(initialComment);

  const commentData = comment.data;
  const linkId = commentData["link_id"];

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

      setComment({
        ...comment,
        data: {
          ...comment["data"],
          replies: {
            ...comment["data"]["replies"],
            data: {
              ...comment["data"]["replies"]["data"],
              children: [
                ...comment["data"]["replies"]["data"]["children"].filter(
                  (reply: any) => reply !== more
                ),
                ...moreResponse.data["json"]["data"]["things"],
              ],
            },
          },
        },
      });
    };
  };

  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue">
      <Heading size={"sm"}>{commentData["author"]}</Heading>
      <Box>
        <SanitizeHTML dirty={commentData["body_html"]} />
      </Box>
      <Box>{commentData["score"]}</Box>
      <Box>{commentData["depth"]}</Box>
      <Stack pl={2}>
        {commentData["replies"] &&
          commentData["replies"]["data"]["children"].map(
            (reply: any, index: number) => {
              if (reply["kind"] === "more") {
                const count = reply["data"]["count"];
                return (
                  <Box key={index}>
                    {count > 0 ? (
                      <Button
                        onClick={genHandleClickMore(reply)}
                      >{`${count} more ${
                        count > 1 ? "replies" : "reply"
                      }`}</Button>
                    ) : (
                      <Button>Continue Thread</Button>
                    )}
                  </Box>
                );
              }
              return <Comment initialComment={reply} key={index} />;
            }
          )}
      </Stack>
    </Box>
  );
};

export default Comment;
