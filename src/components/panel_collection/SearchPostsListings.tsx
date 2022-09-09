import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import useAtBottom from "../../lib/hooks/useAtBottom";
import { getSearchPostsPath } from "../../lib/reddit/redditUrlUtils";
import PostListing from "../PostListing";

type Props = {
  searchQuery: string;
  sort: string;
  time: string;
} & BoxProps;

const SearchPostsListings: FC<Props> = ({
  searchQuery,
  sort,
  time,
  ...innerProps
}) => {
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
    const { pathname: path, query } = getSearchPostsPath(
      searchQuery,
      sort,
      time,
      "link",
      afters[i]
    );
    pages.push(
      <PostListing
        pathname={path}
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

export default SearchPostsListings;
