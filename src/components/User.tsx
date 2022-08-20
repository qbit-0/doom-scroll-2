import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

import RedditAvatar from "./RedditAvatar";

type Props = { user: any };

const User: FC<Props> = ({ user }) => {
  return (
    <Box p="4">
      <RedditAvatar
        username={user["data"]["name"]}
        initialIconImg={user["data"]["icon_img"]}
      />
      <Heading>{user["data"]["name"]}</Heading>
    </Box>
  );
};

export default User;
