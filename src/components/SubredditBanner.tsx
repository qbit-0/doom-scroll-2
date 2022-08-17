import { Flex, Image } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type Props = {
  subreddit: string;
};

const SubredditBanner: FC<Props> = ({ subreddit }) => {
  const [about, setAbout] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const aboutResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/r/${subreddit}/about`,
      });
      setAbout(aboutResponse.data);
    })();
  }, [subreddit]);

  if (about?.["data"]?.["banner_background_image"]) {
    return (
      <Image
        src={about["data"]["banner_background_image"]}
        alt="subreddit banner"
      />
    );
  }

  if (about?.["data"]["header_img"]) {
    return (
      <Flex
        justify="center"
        align="center"
        bgColor={about["data"]["banner_background_color"]}
        minH="36"
      >
        <Image
          src={about["data"]["header_img"]}
          mx="auto"
          alt="subreddit banner"
        />
      </Flex>
    );
  }

  return null;
};

export default SubredditBanner;
