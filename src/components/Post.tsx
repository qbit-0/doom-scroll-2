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
  PropsOf,
  Spacer,
  StackDivider,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useMemo } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postsFilter } = useContext(PostsFilterContext);

  const textSentiment = useMemo(() => {
    const sentiment = new Sentiment();
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

  const handleOpenModal = () => {
    const pathname = `/r/${post.data.subreddit}/comments/${post.data.id}`;
    history.pushState(null, "", pathname);
    onOpen();
  };

  useEffect(() => {
    router.beforePopState(({}) => {
      onClose();
      history.back();
      return false;
    });
  }, [router, onClose]);

  const result = useMemo(() => {
    return (
      <Card
        p="0"
        disabled={disabled}
        darkenContentWhenDisabled
        _hover={{ borderColor: "gray.400" }}
        onClick={(event) => {
          if (event.target === this && openModal) handleOpenModal();
        }}
        cursor="pointer"
        {...innerProps}
      >
        <Box>
          <Flex>
            <ButtonGroup size="sm" variant="ghost">
              <VStack w="16" py="2" spacing="0">
                <IconButton icon={<BiUpvote />} aria-label="upvote" />
                <Text fontSize="sm" display="inline">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(post.data.score)}
                </Text>
                <IconButton icon={<BiDownvote />} aria-label="downvote" />
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
                    if (openModal) handleOpenModal();
                  }}
                >
                  <Heading size="lg">{post.data.title}</Heading>
                </Link>
              </Box>
              <PostBody post={post} />
            </Box>
          </Flex>
          <HStack
            p="2"
            onClick={() => {
              if (openModal) handleOpenModal();
            }}
          >
            <Button
              variant="outline"
              rightIcon={<Icon as={IoChatboxOutline} aria-label="comments" />}
            >
              <Text>{`${post.data.num_comments}`}</Text>
            </Button>
            <Spacer />
            <HStack divider={<StackDivider />}>
              <Box>
                <Text>Upvote Ratio</Text>
                <Text>{`${(post.data.upvote_ratio * 100).toFixed(0)}%`}</Text>
              </Box>
              <Tooltip
                label={`positive: ${textSentiment.positive}\nnegative: ${textSentiment.negative}`}
              >
                <Box>
                  <Text>Text Sen.</Text>
                  <Text>{`${textSentiment.comparative.toFixed(3)}`}</Text>
                </Box>
              </Tooltip>
              <Box>
                <Text>Agg. Sen.</Text>
                <Text>{`${aggregateSentiment.toFixed(3)}`}</Text>
              </Box>
            </HStack>
          </HStack>
        </Box>
        <PostsAndCommentsModal
          post={post}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            history.back();
          }}
        />
      </Card>
    );
  }, [post, disabled, isOpen]);

  return result;
};

export default Post;
