import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import useReddit from "../lib/hooks/useReddit";
import {
  RedditComment,
  RedditLink,
  RedditListing,
  RedditMore,
  RedditPostAndComments,
} from "../lib/reddit/redditDataStructs";
import { getCommentsPath } from "../lib/reddit/redditUrlUtils";
import Card from "./Card";
import Comments from "./Comments";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  subreddit: string;
  article: string;
  commentId?: string;
  initialPost?: RedditLink;
  initialComments?: RedditListing<RedditComment | RedditMore>;
  openModal?: boolean;
};

const PostAndComments: FC<Props> = ({
  subreddit,
  article,
  commentId,
  initialPost,
  initialComments,
  openModal = true,
}) => {
  const router = useRouter();
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  const { path, query } = getCommentsPath(subreddit, article, commentId);

  const { data: postAndComments } = useReddit<RedditPostAndComments>({
    method: "GET",
    path,
    query,
  });

  useEffect(() => {
    if (postAndComments) {
      setPost(postAndComments[0].data.children[0]);
      setComments(postAndComments[1]);
    }
  }, [postAndComments]);

  return (
    <>
      {post ? (
        <Post post={post} openModal={openModal} disabledOverride={false} />
      ) : (
        <PostSkeleton />
      )}
      {commentId && (
        <Button
          w="full"
          onClick={() => {
            router.push(`/r/${subreddit}/comments/${article}`);
          }}
        >
          View All Comments
        </Button>
      )}
      <Comments
        subreddit={subreddit}
        article={article}
        initialComments={comments}
      />
    </>
  );
};

export default PostAndComments;
