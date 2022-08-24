import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditAccount, RedditListing } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import User from "./User";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
};

const UserListing: FC<Props> = ({ path, query, updateAfter }) => {
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
      <>
        {new Array(4).fill(null).map((_, index: number) => {
          return (
            <Card key={index}>
              <User />
            </Card>
          );
        })}
      </>
    );
  }

  return (
    <>
      {userListing.data.children.map((user: RedditAccount, index: number) => (
        <Card key={index}>
          <User user={user} />
        </Card>
      ))}
    </>
  );
};

export default UserListing;
