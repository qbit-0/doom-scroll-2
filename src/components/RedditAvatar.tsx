import { Avatar } from "@chakra-ui/react";
import { FC, useRef } from "react";

import useOnScreen from "../lib/hooks/useOnScreen";
import useReddit from "../lib/hooks/useReddit";
import { RedditAccount } from "../lib/reddit/redditDataStructs";

type Props = {
  username: string;
};

const RedditAvatar: FC<Props> = ({ username }) => {
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const avatarOnScreen = useOnScreen<HTMLDivElement | null>(avatarRef);

  const user = useReddit<RedditAccount>(
    username !== "[deleted]" && avatarOnScreen
      ? { method: "GET", path: `/user/${username}/about` }
      : null
  );
  return (
    <Avatar
      ref={avatarRef}
      size="sm"
      name={username}
      src={user?.data.icon_img}
    />
  );
};

export default RedditAvatar;
