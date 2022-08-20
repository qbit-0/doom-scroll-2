import { VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import { getMore } from "../lib/reddit/redditClientApi";
import { genCommentTrees } from "../lib/reddit/redditDataStructs";
import Comment from "./Comment";
import More from "./More";

type Props = {
  initialComments?: any;
  article?: string;
};

const Comments: FC<Props> = ({ article, initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const genHandleClickMore = (more: any) => {
    return async () => {
      if (!article) return;

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

  if (!comments) {
    const commentsPlaceholder = [];
    for (let i = 0; i < 10; i++) {
      commentsPlaceholder.push(<Comment key={i} />);
    }
    return <>{commentsPlaceholder}</>;
  }

  return (
    <VStack>
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
        return <Comment article={article} comment={comment} key={index} />;
      })}
    </VStack>
  );
};

export default Comments;
