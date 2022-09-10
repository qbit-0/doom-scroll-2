import { Heading } from "@chakra-ui/react";
import { FC } from "react";

import { RedditAccount } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import RedditAvatar from "./RedditAvatar";

type Props = { user: RedditAccount };

const User: FC<Props> = ({ user }) => {
  return (
    <Card>
      <RedditAvatar username={user.data.name} />
      <Heading>{user.data.name}</Heading>
    </Card>
  );
};

export default User;
