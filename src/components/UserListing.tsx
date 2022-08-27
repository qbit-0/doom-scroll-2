import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditAccount, RedditListing } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import User from "./User";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
} & BoxProps;

const UserListing: FC<Props> = ({
  path,
  query,
  updateAfter,
  ...innerProps
}) => {
  const { data: userListing } = useReddit<RedditListing<RedditAccount>>({
    method: "GET",
    path,
    query,
  });

  useEffect(() => {
    if (userListing) updateAfter(userListing.data.after);
  }, [userListing]);

  if (!userListing) {
    return (
      <Box {...innerProps}>
        {new Array(4).fill(null).map((_, index: number) => {
          return <User key={index} />;
        })}
      </Box>
    );
  }

  return (
    <Box {...innerProps}>
      {userListing.data.children.map((user: RedditAccount, index: number) => (
        <User user={user} key={index} />
      ))}
    </Box>
  );
};

export default UserListing;
