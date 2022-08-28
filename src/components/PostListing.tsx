import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditLink, RedditListing } from "../lib/reddit/redditDataStructs";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
} & BoxProps;

const PostListing: FC<Props> = ({
  path,
  query,
  updateAfter,
  ...innerProps
}) => {
  const { data: postListing } = useReddit<RedditListing<RedditLink>>({
    method: "GET",
    path,
    query,
  });

  useEffect(() => {
    if (postListing) updateAfter(postListing.data.after);
  }, [postListing]);

  if (!postListing) {
    return (
      <Box {...innerProps}>
        {new Array(4).fill(null).map((_, index: number) => {
          return <PostSkeleton key={index} />;
        })}
      </Box>
    );
  }
  return (
    <Box {...innerProps}>
      {postListing.data.children.map((post: RedditLink, index: number) => (
        <Post post={post} key={index} />
      ))}
    </Box>
  );
};

export default PostListing;
