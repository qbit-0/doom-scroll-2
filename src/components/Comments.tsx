import { Box, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import { getMore } from "../lib/reddit/redditClientApi";
import { genCommentTrees } from "../lib/reddit/redditDataStructs";
import Comment from "./Comment";
import CommentSkeleton from "./CommentSkeleton";
import More from "./More";

type Props = {
  article: string;
  initialComments: any;
};

const Comments: FC<Props> = ({ article, initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const commentsPlaceholder = [];
  for (let i = 0; i < 10; i++) {
    commentsPlaceholder.push(
      <Box w="full" key={i}>
        <CommentSkeleton />
      </Box>
    );
  }

  const genHandleClickMore = (more: any) => {
    return async () => {
      const moreResponse = await getMore(
        more["data"]["id"],
        article,
        more["data"]["children"]
      );

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
    <VStack>
      {comments
        ? comments["data"]["children"].map((comment: any, index: number) => {
            if (comment["kind"] === "more") {
              return (
                <More
                  more={comment}
                  handleClickMore={genHandleClickMore(comment)}
                  key={index}
                />
              );
            }
            return <Comment article={article} comment={comment} key={index} />;
          })
        : commentsPlaceholder}
    </VStack>
  );
};

export default Comments;
