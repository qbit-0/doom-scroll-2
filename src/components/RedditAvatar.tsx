import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type Props = {
  username: string;
};

const RedditAvatar: FC<Props> = ({ username }) => {
  const [author, setAuthor] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (username !== "[deleted]") {
        const authorResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/user/${username}/about`,
        });
        setAuthor(authorResponse.data);
      }
    })();
  }, [username]);

  return (
    <Avatar size="sm" name={username} src={author?.["data"]["icon_img"]} />
  );
};

export default RedditAvatar;
