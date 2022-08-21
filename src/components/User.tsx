import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

import { RedditAccount } from "../lib/reddit/redditDataStructs";
import RedditAvatar from "./RedditAvatar";

type Props = { user: RedditAccount };

const User: FC<Props> = ({ user }) => {
  return (
    <Box p="4">
      <RedditAvatar
        username={user.data.name}
        initialIconImg={user.data.icon_img}
      />
      <Heading>{user.data.name}</Heading>
    </Box>
  );
};

export default User;
