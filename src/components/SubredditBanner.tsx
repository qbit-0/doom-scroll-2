import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  about: any;
};

const SubredditBanner: FC<Props> = ({ about }) => {
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
