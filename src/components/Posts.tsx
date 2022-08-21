import { FC } from "react";

import { RedditLink, RedditListing } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  postListings?: RedditListing<RedditLink>[] | null;
};

const Posts: FC<Props> = ({ postListings }) => {
  if (!postListings) {
    return (
      <>
        {new Array(4).fill(null).map((_, index: number) => {
          return (
            <Card key={index}>
              <PostSkeleton />
            </Card>
          );
        })}
      </>
    );
  }

  return (
    <>
      {postListings.reduce(
        (
          flattenedPosts: JSX.Element[],
          postListing: RedditListing<RedditLink>,
          listingIndex: number
        ) => {
          return [
            ...flattenedPosts,
            ...postListing.data.children.map(
              (post: RedditLink, index: number) => (
                <Card key={listingIndex + index}>
                  <Post post={post} />
                </Card>
              )
            ),
          ];
        },
        []
      )}
    </>
  );
};

export default Posts;
