import { Avatar, Box, Flex, HStack, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type Props = {
  subreddit: string;
};

const SubredditBanner: FC<Props> = ({ subreddit }) => {
  const [about, setAbout] = useState<any | null>(null);

  console.log(about);

  useEffect(() => {
    (async () => {
      const aboutResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/r/${subreddit}/about`,
      });
      setAbout(aboutResponse.data);
    })();
  }, [subreddit]);

  let background;
  if (about?.["data"]?.["banner_background_image"]) {
    background = (
      <Box
        w="full"
        h="36"
        bgImage={about["data"]["banner_background_image"]}
        bgPos="center"
      />
    );
  } else if (about?.["data"]["header_img"]) {
    background = (
      <Flex
        justify="center"
        align="center"
        bgColor={about["data"]["banner_background_color"]}
        h="36"
      >
        <Box bgImage={about["data"]["header_img"]} bgPos="center" />
      </Flex>
    );
  } else {
    background = <Box w="full" h="36" bgColor="gray" />;
  }

  return (
    <Box>
      {background}
      <Box bgColor="darkgray" p="4">
        <HStack mx="auto" w="fit-content">
          <Avatar
            name={subreddit}
            src={
              about?.["data"]?.["community_icon"] ||
              about?.["data"]?.["icon_img"]
            }
            size="lg"
          />
          <Heading display="inline-block">{about?.["data"]?.["title"]}</Heading>
        </HStack>
      </Box>
    </Box>
  );
};

export default SubredditBanner;
