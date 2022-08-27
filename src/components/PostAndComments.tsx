import { Box, BoxProps } from "@chakra-ui/react";
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

type Props = {
  subreddit: string;
  article: string;
  commentId?: string;
  initialPost?: RedditLink;
  initialComments?: RedditListing<RedditComment | RedditMore>;
  openModal?: boolean;
} & BoxProps;

const PostAndComments: FC<Props> = ({
  subreddit,
  article,
  commentId,
  initialPost,
  initialComments,
  openModal = true,
  ...innerProps
}) => {
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

  // if (location.pathname === pathname) {
  //   history.replaceState(
  //     null,
  //     "",
  //     getPathname(
  //       postsResponse.data[0]["data"]["children"][0]["data"]["permalink"],
  //       query
  //     )
  //   );
  // }

  return (
    <Box w="full" {...innerProps}>
      <Post post={post} openModal={openModal} />
      <Card>
        <Comments
          initialComments={comments}
          subreddit={subreddit}
          article={article}
        />
      </Card>
    </Box>
  );
};

export default PostAndComments;
