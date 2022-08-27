import { Avatar, AvatarProps } from "@chakra-ui/react";
import { FC, useRef } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditAccount } from "../lib/reddit/redditDataStructs";

type Props = {
  username: string;
} & AvatarProps;

const RedditAvatar: FC<Props> = ({ username, ...avatarProps }) => {
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useReddit<RedditAccount>(
    username !== "[deleted]"
      ? { method: "GET", path: `/user/${username}/about` }
      : null
  );
  return (
    <Avatar
      ref={avatarRef}
      size="sm"
      name={username}
      src={user?.data.icon_img}
      {...avatarProps}
    />
  );
};

export default RedditAvatar;
