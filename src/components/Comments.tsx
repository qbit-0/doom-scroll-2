import { StackProps, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import {
  RedditComment,
  RedditListing,
  RedditMore,
  genCommentTrees,
} from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import Comment from "./Comment";
import CommentSkeleton from "./CommentSkeleton";
import More from "./More";

type Props = {
  subreddit: string;
  article: string;
  asCards?: boolean;
  initialComments?: RedditListing<RedditComment | RedditMore>;
} & StackProps;

const Comments: FC<Props> = ({
  subreddit,
  article,
  asCards = false,
  initialComments,
  ...innerProps
}) => {
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
      commentsPlaceholder.push(<CommentSkeleton key={i} />);
    }
    return <VStack {...innerProps}>{commentsPlaceholder}</VStack>;
  }

  return (
    <VStack {...innerProps}>
      {comments.data.children.map(
        (comment: RedditComment | RedditMore, index: number) => {
          if (comment.kind === "more") {
            return asCards ? (
              <Card p="1" key={index}>
                <More
                  more={comment}
                  updateReplies={genUpdateReplies(comment)}
                  subreddit={subreddit}
                  article={article}
                />
              </Card>
            ) : (
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
