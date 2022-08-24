import { VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import { getMore } from "../lib/api/redditApi";
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

  const genLoadMore = (more: any) => {
    return async () => {
      if (!comments || !article) return;

      const moreResponse = await getMore(
        more.data.id,
        article,
        more.data.children
      );

      const newComments = {
        ...comments,
        data: {
          ...comments.data,
          children: [
            ...comments.data.children.filter(
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
                loadMore={genLoadMore(comment)}
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
