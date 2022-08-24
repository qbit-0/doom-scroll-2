import { FC, useContext, useEffect, useState } from "react";

import { getSearchUsers } from "../lib/api/redditApi";
import { MeContext } from "../lib/context/MeProvider";
import useAtBottom from "../lib/hooks/useAtBottom";
import { RedditAccount, RedditListing } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import PostSkeleton from "./PostSkeleton";
import User from "./User";

type Props = {
  searchQuery: string;
};

const UserListings: FC<Props> = ({ searchQuery }) => {
  const [userListings, setUserListings] = useState<
    RedditListing<RedditAccount>[] | null
  >(null);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useContext(MeContext);
  const atBottom = useAtBottom(0);

  useEffect(() => {
    (async () => {
      const usersResponse = await getSearchUsers(searchQuery);
      setUserListings([usersResponse.data]);
      setAfter(usersResponse.data.data.after);
    })();
  }, [me, searchQuery]);

  useEffect(() => {
    if (userListings && after && atBottom) {
      (async () => {
        const usersResponse = await getSearchUsers(searchQuery, after);
        setUserListings([...userListings, usersResponse.data]);
        setAfter(usersResponse.data.data.after);
      })();
    }
  }, [searchQuery, after, userListings, atBottom]);

  if (!userListings) {
    return (
      <>
        {new Array(4).fill(null).map((_, index: number) => {
          return (
            <Card key={index}>
              <PostSkeleton />
            </Card>
          );
        })}
      </>
    );
  }

  if (UserListings.length === 0) return null;

  return (
    <>
      {userListings.reduce(
        (
          flattenedUsers: JSX.Element[],
          users: RedditListing<RedditAccount>,
          listingIndex: number
        ) => {
          return [
            ...flattenedUsers,
            ...users.data.children.map((user: RedditAccount, index: number) => (
              <Card key={listingIndex + " " + index}>
                <User user={user} />
              </Card>
            )),
          ];
        },
        []
      )}
    </>
  );
};

export default UserListings;
