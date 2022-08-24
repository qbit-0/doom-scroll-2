import { VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import {
  RedditComment,
  RedditListing,
  RedditMore,
  genCommentTrees,
} from "../lib/reddit/redditDataStructs";
import Comment from "./Comment";
import More from "./More";

type Props = {
  subreddit: string;
  article: string;
  initialComments?: RedditListing<RedditComment | RedditMore>;
};

const Comments: FC<Props> = ({ initialComments, subreddit, article }) => {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const genUpdateReplies = (more: RedditMore) => {
    return async (replies: (RedditComment | RedditMore)[]) => {
      if (!comments) return;

      const newComments = {
        ...comments,
        data: {
          ...comments.data,
          children: [
            ...comments.data.children.filter(
              (comment: any) => comment !== more
            ),
            ...genCommentTrees(replies),
          ],
        },
      };

      setComments(newComments);
    };
  };

  if (!comments) {
    const commentsPlaceholder = [];
    for (let i = 0; i < 10; i++) {
      commentsPlaceholder.push(<Comment article={article} key={i} />);
    }
    return <>{commentsPlaceholder}</>;
  }

  return (
    <VStack>
      {comments.data.children.map(
        (comment: RedditComment | RedditMore, index: number) => {
          if (comment.kind === "more") {
            return (
              <More
                more={comment}
                updateReplies={genUpdateReplies(comment)}
                subreddit={subreddit}
                article={article}
                key={index}
              />
            );
          }
          return <Comment comment={comment} article={article} key={index} />;
        }
      )}
    </VStack>
  );
};

export default Comments;
