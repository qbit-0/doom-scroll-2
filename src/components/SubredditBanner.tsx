import { Avatar, Box, BoxProps, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

import { RedditSubreddit } from "../lib/reddit/redditDataStructs";

type Props = {
  subreddit: string;
  subredditAbout?: RedditSubreddit;
  fullBanner: boolean;
} & BoxProps;

const SubredditBanner: FC<Props> = ({
  subreddit,
  subredditAbout,
  fullBanner = false,
  ...innerProps
}) => {
  let background;
  if (subredditAbout?.data?.banner_background_image) {
    background = (
      <Box
        w="full"
        h="36"
        bgImage={subredditAbout.data.banner_background_image}
        bgColor={
          subredditAbout.data.banner_background_color ||
          subredditAbout.data.primary_color
        }
        bgPos="center"
      />
    );
  } else if (subredditAbout?.data.header_img) {
    background = (
      <Flex
        justify="center"
        align="center"
        bgColor={
          subredditAbout.data.banner_background_color ||
          subredditAbout.data.primary_color
        }
        h="36"
      >
        <Box bgImage={subredditAbout.data.header_img} bgPos="center" />
      </Flex>
    );
  } else {
    background = (
      <Box
        w="full"
        h="36"
        bgColor={
          subredditAbout?.data.banner_background_color ||
          subredditAbout?.data.primary_color ||
          "gray"
        }
      />
    );
  }

  return (
    <NextLink href={`/r/${subreddit}`}>
      <Link>
        <Box {...innerProps}>
          {background}
          {fullBanner && (
            <Flex justify="center" position="relative" bgColor="darkgray">
              <Box p="4" w="5xl">
                <Avatar
                  name="r /"
                  src={
                    subredditAbout?.data?.community_icon ||
                    subredditAbout?.data?.icon_img
                  }
                  size="xl"
                  mt="-8"
                />
                <Box ml="2" display="inline-block">
                  <Heading> {subredditAbout?.data?.title}</Heading>
                  <Heading size="md">{`r/${subreddit}`}</Heading>
                </Box>
              </Box>
            </Flex>
          )}
        </Box>
      </Link>
    </NextLink>
  );
};

export default SubredditBanner;
