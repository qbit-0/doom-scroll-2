import { Heading } from "@chakra-ui/react";
import { FC } from "react";

import ContentCard from "../../ContentCard";
import { RedditAccount } from "../../lib/reddit/redditDataStructs";
import RedditAvatar from "../reddit_basic/RedditAvatar";

type Props = { user: RedditAccount };

const User: FC<Props> = ({ user }) => {
  return (
    <ContentCard>
      <RedditAvatar username={user.data.name} />
      <Heading>{user.data.name}</Heading>
    </ContentCard>
  );
};

export default User;
