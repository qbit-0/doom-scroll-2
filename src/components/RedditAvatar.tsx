import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";

import useOnScreen from "../lib/hooks/useOnScreen";

type Props = {
  username: string;
  initialIconImg?: string;
};

const RedditAvatar: FC<Props> = ({ username, initialIconImg }) => {
  const [iconImg, setIconImg] = useState(initialIconImg);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const avatarOnScreen = useOnScreen<HTMLDivElement | null>(
    avatarRef,
    "1000px 1000px 1000px 1000px"
  );

  useEffect(() => {
    if (username !== "[deleted]" && avatarOnScreen)
      (async () => {
        const authorResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/user/${username}/about`,
        });
        setIconImg(authorResponse.data.data.icon_img);
      })();
  }, [username, avatarOnScreen]);

  return <Avatar ref={avatarRef} size="sm" name={username} src={iconImg} />;
};

export default RedditAvatar;
