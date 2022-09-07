import { FC, useEffect, useState } from "react";

import {
  RedditComment,
  RedditListing,
  RedditMore,
  genCommentTrees,
} from "../../lib/reddit/redditDataStructs";
import Comment from "../Comment";
import CommentSkeleton from "../CommentSkeleton";
import More from "../More";

type Props = {
  article: string;
  initialComments?: RedditListing<RedditComment | RedditMore>;
};

const Comments: FC<Props> = ({ article, initialComments }) => {
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
    return <>{commentsPlaceholder}</>;
  }

  return (
    <>
      {comments.data.children.map(
        (comment: RedditComment | RedditMore, index: number) => {
          if (comment.kind === "more") {
            return (
              <More
                more={comment}
                updateReplies={genUpdateReplies(comment)}
                article={article}
                key={index}
              />
            );
          }
          return <Comment comment={comment} article={article} key={index} />;
        }
      )}
    </>
  );
};

export default Comments;
