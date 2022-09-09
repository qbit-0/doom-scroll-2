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
  Stack,
  StackDivider,
  Text,
  Tooltip,
  VStack,
  useBreakpointValue,
  useConst,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useMemo } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { IoChatboxOutline } from "react-icons/io5";
import Sentiment from "sentiment";

import { PostsFilterContext } from "../lib/context/PostsFilterProvider";
import { RedditLink } from "../lib/reddit/redditDataStructs";
import { getAggPostSentiment, isPostFiltered } from "../lib/utils/filterUtils";
import { getElapsedString } from "../lib/utils/getElapsedString";
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
  const browsePathname = useConst(router.asPath);
  const postPathname = `/r/${post.data.subreddit}/comments/${post.data.id}`;

  const { postsFilter } = useContext(PostsFilterContext);

  const sentiment = useConst(() => new Sentiment());
  const textSentiment = useMemo(() => {
    return sentiment.analyze(
      post.data.title + (post.data.selftext ? `\n${post.data.selftext}` : "")
    );
  }, [post.data]);

  const aggSentiment = getAggPostSentiment(
    post.data.upvote_ratio,
    textSentiment.comparative
  );

  let disabled: any = false;
  if (disabledOverride !== undefined) {
    disabled = disabledOverride;
  } else {
    disabled = isPostFiltered(postsFilter, post, textSentiment, aggSentiment);
  }

  const closeOnUrlMismatch = useCallback(() => {
    if (window.location.pathname !== postPathname) onModalClose();
  }, []);

  const openOnUrlMatch = useCallback(() => {
    if (window.location.pathname === postPathname) onModalOpen();
  }, []);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure({
    onOpen: () => {
      window.addEventListener("popstate", closeOnUrlMismatch);
      window.removeEventListener("popstate", openOnUrlMatch);
    },
    onClose: () => {
      window.addEventListener("popstate", openOnUrlMatch);
      window.removeEventListener("popstate", closeOnUrlMismatch);
    },
  });

  useEffect(() => {
    return () => {
      window.removeEventListener("popstate", closeOnUrlMismatch);
      window.removeEventListener("popstate", openOnUrlMatch);
    };
  }, []);

  const handleModalOpen = () => {
    history.pushState(
      null,
      "",
      `/r/${post.data.subreddit}/comments/${post.data.id}`
    );
    onModalOpen();
  };

  const handleModalClose = () => {
    history.pushState(null, "", browsePathname);
    onModalClose();
  };

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

  const voteAtBottom = useBreakpointValue({ base: true, sm: false });
  const bottomStackDirection = useBreakpointValue<"column" | "row">({
    base: "column",
    sm: "row",
  });

  const result = useMemo(() => {
    return (
      <Card
        p="0"
        disabled={disabled}
        darkenContentWhenDisabled
        _hover={{ borderColor: "gray.400" }}
        onClick={(event) => {
          if (event.target === this && openModal) handleModalOpen();
        }}
        cursor="pointer"
        {...innerProps}
      >
        <Box>
          <Flex>
            <ButtonGroup hidden={voteAtBottom} size="md" variant="ghost">
              <VStack w="12" py="2" spacing="0">
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
                    if (openModal) handleModalOpen();
                  }}
                >
                  <Heading size="lg">{post.data.title}</Heading>
                </Link>
              </Box>
              <PostBody post={post} />
            </Box>
          </Flex>
          <Stack direction={bottomStackDirection} p="2">
            <HStack>
              <Button
                variant="outline"
                rightIcon={<Icon as={IoChatboxOutline} aria-label="comments" />}
                onClick={() => {
                  if (openModal) handleModalOpen();
                }}
              >
                <Text>{`${post.data.num_comments}`}</Text>
              </Button>
              <ButtonGroup hidden={!voteAtBottom} size="md" variant="ghost">
                <HStack spacing="0">
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
                </HStack>
              </ButtonGroup>
            </HStack>
            <Spacer />
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">
                  <HStack divider={<StackDivider />}>
                    <Tooltip label="The ratio of upvotes to total votes on a post.">
                      <Box>
                        <Text>Upvote Ratio</Text>
                        <Text>{`${(post.data.upvote_ratio * 100).toFixed(
                          0
                        )}%`}</Text>
                      </Box>
                    </Tooltip>
                    <Tooltip label="How positive or negative is the text content of a post. A positive value means a positive sentiment. A negative value means a negative sentiment.">
                      <Box>
                        <Text>Text Sen.</Text>
                        <Text>{`${textSentiment.comparative.toFixed(3)}`}</Text>
                      </Box>
                    </Tooltip>

                    <Tooltip label="Combined score that determines the overall sentiment of a post.">
                      <Box>
                        <Text>Agg. Sen.</Text>
                        <Text>{`${aggSentiment.toFixed(3)}`}</Text>
                      </Box>
                    </Tooltip>
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
          </Stack>
        </Box>

        <PostsAndCommentsModal
          post={post}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </Card>
    );
  }, [post, disabled, isModalOpen, voteAtBottom, bottomStackDirection]);

  return result;
};

export default Post;
