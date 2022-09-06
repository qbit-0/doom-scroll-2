import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PropsOf,
  Spacer,
  StackDivider,
  Text,
  Tooltip,
  VStack,
  useConst,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useMemo } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { IoChatboxOutline } from "react-icons/io5";
import Sentiment from "sentiment";

import { PostsFilterContext } from "../lib/context/PostsFilterProvider";
import { RedditLink } from "../lib/reddit/redditDataStructs";
import { getElapsedString } from "../lib/utils/getElapsedString";
import { getAggPostSentiment } from "../lib/utils/sentimentUtils";
import Card from "./Card";
import PostBody from "./PostBody";
import PostsAndCommentsModal from "./PostsAndCommentsModal";

type Props = {
  post: RedditLink;
  openModal?: boolean;
  disabledOverride?: boolean;
} & PropsOf<typeof Card>;

const Post: FC<Props> = ({
  post,
  openModal = true,
  disabledOverride,
  ...innerProps
}) => {
  const router = useRouter();

  const { postsFilter } = useContext(PostsFilterContext);

  const sentiment = useConst(() => new Sentiment());
  const textSentiment = useMemo(() => {
    return sentiment.analyze(
      post.data.title + (post.data.selftext ? `\n${post.data.selftext}` : "")
    );
  }, [post.data]);

  const aggregateSentiment = getAggPostSentiment(
    post.data.upvote_ratio,
    textSentiment.comparative
  );

  let disabled: any = false;
  if (disabledOverride !== undefined) {
    disabled = disabledOverride;
  } else {
    disabled =
      post.data.upvote_ratio < postsFilter.minUpvoteRatio ||
      post.data.upvote_ratio > postsFilter.maxUpvoteRatio ||
      textSentiment.comparative < postsFilter.minTextSentiment ||
      textSentiment.comparative > postsFilter.maxTextSentiment ||
      aggregateSentiment < postsFilter.minAggSentiment ||
      aggregateSentiment > postsFilter.maxAggSentiment;
  }

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure({
    onOpen: () => {
      const pathname = `/r/${post.data.subreddit}/comments/${post.data.id}`;
      history.pushState(null, "", pathname);
    },
    onClose: () => {
      history.back();
    },
  });

  useEffect(() => {
    router.beforePopState(({}) => {
      onModalClose();
      return false;
    });
  }, [router, onModalClose, isModalOpen]);

  const handleUpvote = async () => {
    await axios.post("/api/reddit", {
      method: "POST",
      path: "/api/vote",
      query: {
        dir: post.data.likes === true ? 0 : 1,
        id: post.data.name,
        rank: 10,
      },
    });
  };

  const handleDownvote = async () => {
    await axios.post("/api/reddit", {
      method: "POST",
      path: "/api/vote",
      query: {
        dir: post.data.likes === false ? 0 : -1,
        id: post.data.name,
        rank: 10,
        header: null,
      },
    });
  };

  let upvoteTextColor = "";
  if (post.data.likes === true) upvoteTextColor = "orange";
  else if (post.data.likes === false) upvoteTextColor = "lightblue";

  const result = useMemo(() => {
    return (
      <Card
        p="0"
        disabled={disabled}
        darkenContentWhenDisabled
        _hover={{ borderColor: "gray.400" }}
        onClick={(event) => {
          if (event.target === this && openModal) onModalOpen();
        }}
        cursor="pointer"
        {...innerProps}
      >
        <Box>
          <Flex>
            <ButtonGroup size="md" variant="ghost">
              <VStack w="16" py="2" spacing="0">
                <IconButton
                  colorScheme={post.data.likes === true ? "red" : "black"}
                  icon={<ImArrowUp />}
                  aria-label="upvote"
                  onClick={handleUpvote}
                />
                <Text fontSize="sm" display="inline" color={upvoteTextColor}>
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(post.data.score)}
                </Text>
                <IconButton
                  colorScheme={post.data.likes === false ? "blue" : "black"}
                  icon={<ImArrowDown />}
                  aria-label="downvote"
                  onClick={handleDownvote}
                />
              </VStack>
            </ButtonGroup>
            <Box flex="1">
              <Box p="2">
                <HStack>
                  <Avatar
                    name={"r /"}
                    src={
                      post.data?.sr_detail?.community_icon ||
                      post.data?.sr_detail?.icon_img
                    }
                    size="sm"
                  />
                  <HStack display="inline" divider={<> &middot; </>}>
                    <Heading size="sm" display="inline" color="red">
                      <NextLink href={`/r/${post.data.subreddit}`}>
                        <Link size="sm">{post.data.subreddit}</Link>
                      </NextLink>
                    </Heading>
                    <Heading size="sm" display="inline">
                      {post.data.author}
                    </Heading>
                    <Heading size="sm" display="inline" color="gray">
                      {getElapsedString(post.data.created_utc)}
                    </Heading>
                  </HStack>
                </HStack>
                <Link
                  size="sm"
                  onClick={() => {
                    if (openModal) onModalOpen();
                  }}
                >
                  <Heading size="lg">{post.data.title}</Heading>
                </Link>
              </Box>
              <PostBody post={post} />
            </Box>
          </Flex>
          <HStack p="2">
            <Button
              variant="outline"
              rightIcon={<Icon as={IoChatboxOutline} aria-label="comments" />}
              onClick={() => {
                if (openModal) onModalOpen();
              }}
            >
              <Text>{`${post.data.num_comments}`}</Text>
            </Button>
            <Spacer />
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">
                  <HStack divider={<StackDivider />}>
                    <Box>
                      <Text>Upvote Ratio</Text>
                      <Text>{`${(post.data.upvote_ratio * 100).toFixed(
                        0
                      )}%`}</Text>
                    </Box>
                    <Box>
                      <Text>Text Sen.</Text>
                      <Text>{`${textSentiment.comparative.toFixed(3)}`}</Text>
                    </Box>
                    <Box>
                      <Text>Agg. Sen.</Text>
                      <Text>{`${aggregateSentiment.toFixed(3)}`}</Text>
                    </Box>
                  </HStack>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <Heading size="md" textAlign="center">
                    AFINN Sentiment Analysis
                  </Heading>
                </PopoverHeader>
                <PopoverBody>
                  <Heading size="sm">Sentiment Words:</Heading>
                  {textSentiment.positive.length > 0 && (
                    <Text>{`positive: ${textSentiment.positive
                      .map(
                        (word: string) =>
                          `${word}(${sentiment.analyze(word).score})`
                      )
                      .join(", ")}`}</Text>
                  )}
                  {textSentiment.negative.length > 0 && (
                    <Text>{`negative: ${textSentiment.negative
                      .map(
                        (word: string) =>
                          `${word}(${sentiment.analyze(word).score})`
                      )
                      .join(", ")}`}</Text>
                  )}
                  {textSentiment.positive.length === 0 &&
                    textSentiment.negative.length === 0 && (
                      <Text>No sentiment tokens found.</Text>
                    )}
                  <Heading size="sm">{`Sentiment Sum: ${textSentiment.score}`}</Heading>
                  <Heading size="sm">{`Total Number of Tokens: ${textSentiment.tokens.length}`}</Heading>
                  <Heading size="sm">{`Comparative Text Sentiment: ${textSentiment.comparative.toFixed(
                    3
                  )}`}</Heading>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Box>

        <PostsAndCommentsModal
          post={post}
          isOpen={isModalOpen}
          onClose={onModalClose}
        />
      </Card>
    );
  }, [post, disabled, isModalOpen]);

  return result;
};

export default Post;
