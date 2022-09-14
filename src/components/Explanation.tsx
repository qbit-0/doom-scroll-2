import { Box, Button, Heading, Text, Tooltip, VStack } from "@chakra-ui/react";
import { FC, useContext } from "react";

import ContentCard from "../ContentCard";
import {
  CommentsFilterContext,
  defaultCommentsPreset,
  negativeCommentsPreset,
  positiveCommentsPreset,
} from "../lib/context/CommentsFilterProvider";
import {
  PostsFilterContext,
  defaultPostsPreset,
  negativePostsPreset,
  positivePostsPreset,
} from "../lib/context/PostsFilterProvider";

type Props = {};

const Explanation: FC<Props> = () => {
  const { postsFilter, setPostsFilter } = useContext(PostsFilterContext);
  const { commentsFilter, setCommentsFilter } = useContext(
    CommentsFilterContext
  );

  return (
    <ContentCard>
      <Heading size="2xl" w="full" my="4" textAlign="center">
        DoomScroll
      </Heading>
      <Heading textAlign="center">
        The{" "}
        <Button
          colorScheme="blue"
          variant="outline"
          isActive={
            postsFilter.id === positivePostsPreset.id &&
            commentsFilter.id === positiveCommentsPreset.id
          }
          onClick={(event) => {
            event.stopPropagation();
            if (postsFilter.id === positivePostsPreset.id) {
              setPostsFilter(defaultPostsPreset);
              setCommentsFilter(defaultCommentsPreset);
            } else {
              setPostsFilter(positivePostsPreset);
              setCommentsFilter(positiveCommentsPreset);
            }
          }}
        >
          <Heading fontSize="2xl">Best</Heading>
        </Button>{" "}
        and{" "}
        <Button
          colorScheme="red"
          variant="outline"
          isActive={
            postsFilter.id === negativePostsPreset.id &&
            commentsFilter.id === negativeCommentsPreset.id
          }
          onClick={(event) => {
            event.stopPropagation();
            if (postsFilter.id === negativePostsPreset.id) {
              setPostsFilter(defaultPostsPreset);
              setCommentsFilter(defaultCommentsPreset);
            } else {
              setPostsFilter(negativePostsPreset);
              setCommentsFilter(negativeCommentsPreset);
            }
          }}
        >
          <Heading fontSize="2xl">Worst</Heading>
        </Button>{" "}
        of Reddit
      </Heading>
      <Box
        p="4"
        bgColor="gray.700"
        rounded="md"
        shadow="md"
        w="90%"
        mx="auto"
        my="4"
      >
        <Box position="relative" top="4">
          <Text textAlign="left" fontSize="4xl" lineHeight="0">{`“`}</Text>
        </Box>
        <Text px="8" textAlign="left">
          {`Doomscroll: the tendency to continue to surf or scroll through bad
          news, even though that news is saddening, disheartening, or
          depressing.`}
        </Text>
        <Box position="relative" top="0">
          <Text textAlign="right" fontSize="4xl" lineHeight="0">{`”`}</Text>
        </Box>
      </Box>
      <VStack>
        <Text>
          {`DoomScroll analyzes the sentiment of posts and comments and allows you
        to filter them by different metrics. Ensure that your Reddit feed is
        more positive (or negative). Or only see posts above a certain upvote
        ratio threshold.`}
        </Text>
        <Text>
          {`Overall, filtering by only positive posts will lead to more positive
        interactions, with more agreeable content. Fitlering by only negative posts will lead to more contoversial posts
        and comments, including more angry, edgy, or depressing content.`}
        </Text>
      </VStack>
    </ContentCard>
  );
};

export default Explanation;
