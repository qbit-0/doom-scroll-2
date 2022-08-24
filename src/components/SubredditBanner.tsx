import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";

import { RedditSubreddit } from "../lib/reddit/redditDataStructs";

type Props = {
  subreddit: string;
  about?: RedditSubreddit;
  showTitle: boolean;
};

const SubredditBanner: FC<Props> = ({ subreddit, about, showTitle }) => {
  let background;
  if (about?.data?.banner_background_image) {
    background = (
      <Box
        w="full"
        h="36"
        bgImage={about.data.banner_background_image}
        bgColor={about.data.banner_background_color || about.data.primary_color}
        bgPos="center"
      />
    );
  } else if (about?.data.header_img) {
    background = (
      <Flex
        justify="center"
        align="center"
        bgColor={about.data.banner_background_color || about.data.primary_color}
        h="36"
      >
        <Box bgImage={about.data.header_img} bgPos="center" />
      </Flex>
    );
  } else {
    background = (
      <Box
        w="full"
        h="36"
        bgColor={
          about?.data.banner_background_color ||
          about?.data.primary_color ||
          "gray"
        }
      />
    );
  }

  return (
    <Box>
      {background}
      {showTitle && (
        <Flex justify="center" position="relative" bgColor="darkgray">
          <Box p="4" w="5xl">
            <Avatar
              name="r /"
              src={about?.data?.community_icon || about?.data?.icon_img}
              size="xl"
              mt="-8"
            />
            <Box ml="2" display="inline-block">
              <Heading> {about?.data?.title}</Heading>
              <Heading size="md">{`r/${subreddit}`}</Heading>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default SubredditBanner;
