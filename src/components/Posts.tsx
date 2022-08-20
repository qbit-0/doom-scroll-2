import { FC } from "react";

import Card from "./Card";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  postListings: any[] | null;
};

const Posts: FC<Props> = ({ postListings }) => {
  if (postListings === null) {
    return new Array(4).fill(null).map((_, index: number) => {
      return (
        <Card key={index}>
          <PostSkeleton />
        </Card>
      );
    });
  }

  return postListings.map((postListing: any, listingIndex: number) => {
    return postListing.data.children.map((post: any, index: number) => (
      <Card key={listingIndex + index}>
        <Post post={post} />
      </Card>
    ));
  });
};

export default Posts;
