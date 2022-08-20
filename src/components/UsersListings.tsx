import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSearchUsers } from "../lib/reddit/redditClientApi";
import Card from "./Card";
import Subreddit from "./Subreddit";
import User from "./User";

type Props = {
  searchQuery: string;
  initialUserListings: any[];
  loadNext: boolean;
};

const UserListings: FC<Props> = ({
  searchQuery,
  initialUserListings,
  loadNext,
}) => {
  const [userListings, setUserListings] = useState(initialUserListings);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const usersResponse = await getSearchUsers(searchQuery);
      setUserListings([usersResponse.data]);
      setAfter(usersResponse.data["data"]["after"]);
    })();
  }, [me, searchQuery]);

  useEffect(() => {
    if (after && loadNext) {
      (async () => {
        console.log(loadNext);
        const usersResponse = await getSearchUsers(searchQuery, after);
        setUserListings([...userListings, usersResponse.data]);
        setAfter(usersResponse.data["data"]["after"]);
      })();
    }
  }, [searchQuery, after, userListings, loadNext]);

  return (
    userListings.length > 0 &&
    userListings.map((users: any, listingIndex: number) => {
      return users.data.children.map((user: any, index: number) => (
        <Card key={listingIndex + index}>
          <User user={user} />
        </Card>
      ));
    })
  );
};

export default UserListings;
