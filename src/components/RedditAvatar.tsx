import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type Props = {
  username: string;
  initialIconImg?: string;
};

const RedditAvatar: FC<Props> = ({ username, initialIconImg }) => {
  const [iconImg, setIconImg] = useState(initialIconImg);

  useEffect(() => {
    if (username === "[deleted]") return;
    (async () => {
      const authorResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/user/${username}/about`,
      });
      setIconImg(authorResponse.data["data"]["icon_img"]);
    })();
  }, [username]);

  return <Avatar size="sm" name={username} src={iconImg} />;
};

export default RedditAvatar;
