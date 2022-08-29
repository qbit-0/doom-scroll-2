import { StackProps, VStack } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";

import { RedditListing } from "../lib/reddit/redditDataStructs";

type Props = {
  listing?: RedditListing<any>;
  createItem: (item: any, index: number) => React.ReactNode;
  createSkeleton: (index: number) => React.ReactNode;
  updateAfter: (after: string) => void;
} & StackProps;

const Listing: FC<Props> = ({
  listing,
  createItem,
  createSkeleton,
  updateAfter,
  ...innerProps
}) => {
  useEffect(() => {
    if (listing) updateAfter(listing.data.after);
  }, [listing]);

  if (!listing) {
    return (
      <VStack {...innerProps}>
        {new Array(4)
          .fill(null)
          .map((_, index: number) => createSkeleton(index))}
      </VStack>
    );
  }

  return (
    <VStack {...innerProps}>
      {listing.data.children.map((item: any, index: number) =>
        createItem(item, index)
      )}
    </VStack>
  );
};

export default Listing;
