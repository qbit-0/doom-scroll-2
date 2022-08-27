import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import useAtBottom from "../lib/hooks/useAtBottom";
import { getSearchSubredditsPath } from "../lib/reddit/redditUrlUtils";
import SubredditListing from "./SubredditListing";

type Props = {
  searchQuery: string;
} & BoxProps;

const SubredditListings: FC<Props> = ({ searchQuery, ...innerProps }) => {
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [afters, setAfters] = useState<Record<string, string>>({ "0": "" });
  const atBottom = useAtBottom(0);

  useEffect(() => {
    if (atBottom && !isLoading) {
      setPageCount(pageCount + 1);
      setIsLoading(true);
    }
  }, [atBottom, pageCount, isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [afters]);

  const genUpdateAfter = (page: number) => {
    return (after: string) => {
      setAfters({ ...afters, [page + 1]: after });
    };
  };

  const pages: JSX.Element[] = [];
  for (let i = 0; i < pageCount; i++) {
    const { path, query } = getSearchSubredditsPath(searchQuery, afters[i]);
    pages.push(
      <SubredditListing
        path={path}
        query={query}
        updateAfter={genUpdateAfter(i)}
        key={i}
      />
    );
  }

  return (
    <Box w="full" {...innerProps}>
      {pages}
    </Box>
  );
};

export default SubredditListings;
