import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSearchUsers } from "../lib/reddit/redditClientApi";
import Card from "./Card";
import PostSkeleton from "./PostSkeleton";
import Subreddit from "./Subreddit";
import User from "./User";

type Props = {
  searchQuery: string;
  loadNext: boolean;
};

const UserListings: FC<Props> = ({ searchQuery, loadNext }) => {
  const [userListings, setUserListings] = useState<any[] | null>(null);
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
    if (userListings && after && loadNext) {
      (async () => {
        console.log(loadNext);
        const usersResponse = await getSearchUsers(searchQuery, after);
        setUserListings([...userListings, usersResponse.data]);
        setAfter(usersResponse.data["data"]["after"]);
      })();
    }
  }, [searchQuery, after, userListings, loadNext]);

  if (!userListings) {
    return new Array(4).fill(null).map((_, index: number) => {
      return (
        <Card key={index}>
          <PostSkeleton />
        </Card>
      );
    });
  }

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
