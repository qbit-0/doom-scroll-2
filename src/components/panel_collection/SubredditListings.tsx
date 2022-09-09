import { StackProps } from "@chakra-ui/react";
import { FC } from "react";

import { getSearchSubredditsPath } from "../../lib/reddit/redditUrlUtils";
import Listings from "../Listings";
import SubredditListing from "../SubredditListing";

type Props = {
  searchQuery: string;
} & StackProps;

const SubredditListings: FC<Props> = ({ searchQuery, ...innerProps }) => {
  return (
    <Listings
      createListing={(after, updateAfter, index) => {
        const { pathname: path, query } = getSearchSubredditsPath(
          searchQuery,
          after
        );
        return (
          <SubredditListing
            path={path}
            query={query}
            updateAfter={updateAfter}
            key={index}
          />
        );
      }}
      {...innerProps}
    />
  );
};

export default SubredditListings;
