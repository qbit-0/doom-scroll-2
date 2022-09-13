import React, { FC, Fragment, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditListing } from "../lib/reddit/redditDataStructs";

type Props = {
  listing?: RedditListing<any>;
  pathname: string;
  query: Record<string, string>;
  createItem: (item: any) => React.ReactNode;
  createSkeleton: () => React.ReactNode;
  updateAfter: (after: string) => void;
};

const Listing: FC<Props> = ({
  pathname,
  query,
  createItem,
  createSkeleton,
  updateAfter,
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
      <>
        {new Array(4).fill(null).map((_, index: number) => (
          <Fragment key={index}>{createSkeleton()}</Fragment>
        ))}
      </>
    );
  }

  return (
    <>
      {listing.data.children.map((item: any, index: number) => (
        <Fragment key={index}>{createItem(item)}</Fragment>
      ))}
    </>
  );
};

export default Listing;
