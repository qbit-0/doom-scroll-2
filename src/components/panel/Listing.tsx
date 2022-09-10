import { StackProps, VStack } from "@chakra-ui/react";
import React, { FC, Fragment, useEffect } from "react";

import useReddit from "../../lib/hooks/useReddit";
import { RedditListing } from "../../lib/reddit/redditDataStructs";

type Props = {
  listing?: RedditListing<any>;
  pathname: string;
  query: Record<string, string>;
  createItem: (item: any) => React.ReactNode;
  createSkeleton: () => React.ReactNode;
  updateAfter: (after: string) => void;
} & StackProps;

const Listing: FC<Props> = ({
  pathname,
  query,
  createItem,
  createSkeleton,
  updateAfter,
  ...innerProps
}) => {
  const { data: listing } = useReddit<any>({
    method: "GET",
    pathname,
    query,
  });

  useEffect(() => {
    if (listing) updateAfter(listing.data.after);
  }, [listing]);

  if (!listing) {
    return (
      <VStack w="full" {...innerProps}>
        {new Array(4).fill(null).map((_, index: number) => (
          <Fragment key={index}>{createSkeleton()}</Fragment>
        ))}
      </VStack>
    );
  }

  return (
    <VStack w="full" {...innerProps}>
      {listing.data.children.map((item: any, index: number) => (
        <Fragment key={index}>{createItem(item)}</Fragment>
      ))}
    </VStack>
  );
};

export default Listing;
