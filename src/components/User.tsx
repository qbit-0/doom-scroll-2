import { Heading, PropsOf } from "@chakra-ui/react";
import { FC } from "react";

import { RedditAccount } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import RedditAvatar from "./RedditAvatar";

type Props = { user: RedditAccount } & PropsOf<typeof Card>;

const User: FC<Props> = ({ user, ...innerProps }) => {
  return (
    <Card {...innerProps}>
      <RedditAvatar username={user.data.name} />
      <Heading>{user.data.name}</Heading>
    </Card>
  );
};

export default User;
