import { StackProps } from "@chakra-ui/react";
import { FC } from "react";

import { getSearchUsersPath } from "../../lib/reddit/redditUrlUtils";
import Listings from "../Listings";
import UserListing from "../UserListing";

type Props = {
  searchQuery: string;
} & StackProps;

const UserListings: FC<Props> = ({ searchQuery, ...innerProps }) => {
  return (
    <Listings
      createListing={(after, updateAfter, index) => {
        const { path, query } = getSearchUsersPath(searchQuery, after);
        return (
          <UserListing
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

export default UserListings;
