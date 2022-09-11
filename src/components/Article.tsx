import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";

import { SubredditContext } from "../lib/context/SubredditProvider";
import useReddit from "../lib/hooks/useReddit";
import {
  RedditComment,
  RedditLink,
  RedditListing,
  RedditMore,
  RedditPostAndComments,
} from "../lib/reddit/redditDataStructs";
import { getCommentsPath } from "../lib/reddit/redditUrlUtils";
import CommentListing from "./CommentListing";
import PostCard from "./post/Post";
import PostSkeleton from "./post/PostSkeleton";

type Props = {
  article: string;
  commentId?: string;
  initialPost?: RedditLink;
  initialComments?: RedditListing<RedditComment | RedditMore>;
  openModal?: boolean;
};

const Article: FC<Props> = ({
  article,
  commentId,
  initialPost,
  initialComments,
  openModal = true,
}) => {
  const { subreddit } = useContext(SubredditContext);
  const router = useRouter();
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  const { pathname: path, query } = getCommentsPath(
    subreddit || "",
    article,
    commentId
  );

  const { data: postAndComments } = useReddit<RedditPostAndComments>({
    method: "GET",
    pathname: path,
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
        <PostCard post={post} openModal={openModal} disabledOverride={false} />
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
      <CommentListing article={article} initialComments={comments} />
    </>
  );
};

export default Article;
