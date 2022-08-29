import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import useAtBottom from "../lib/hooks/useAtBottom";

type Props = {
  createListing: (
    updateAfter: (after: string) => void,
    index: number
  ) => React.ReactNode;
} & BoxProps;

const Listings: FC<Props> = ({ createListing, ...innerProps }) => {
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

  const pages: React.ReactNode[] = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(createListing(genUpdateAfter(i), i));
  }

  return (
    <Box w="full" {...innerProps}>
      {pages}
    </Box>
  );
};

export default Listings;
