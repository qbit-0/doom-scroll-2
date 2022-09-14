import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer,
  StackDivider,
  Text,
  VStack,
  useConst,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useContext, useMemo } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import Sentiment from "sentiment";

import { CommentsFilterContext } from "../lib/context/CommentsFilterProvider";
import { RedditComment } from "../lib/reddit/redditDataStructs";
import {
  getAggCommentSentiment,
  isCommentFiltered,
} from "../lib/utils/filterUtils";
import { getElapsedString } from "../lib/utils/getElapsedString";
import CommentCard from "./CommentCard";
import CommentListing from "./CommentListing";
import SanitizeHTML from "./SanitizeHTML";
import RedditAvatar from "./reddit_basic/RedditAvatar";

type Props = {
  article: string;
  comment: RedditComment;
};

const Comment: FC<Props> = ({ article, comment }) => {
  const { commentsFilter } = useContext(CommentsFilterContext);
  const sentiment = useConst(() => new Sentiment());

  const textSentiment = useMemo(
    () => sentiment.analyze(comment.data.body),
    [comment.data.body]
  );

  const aggSentiment = getAggCommentSentiment(textSentiment.comparative);
  const disabled = isCommentFiltered(
    commentsFilter,
    comment,
    textSentiment,
    aggSentiment
  );

  const handleUpvote = async () => {
    await axios.post("/api/reddit", {
      method: "POST",
      path: "/api/vote",
      query: {
        dir: comment.data.likes === true ? 0 : 1,
        id: comment.data.name,
        rank: 10,
      },
    });
  };

  const handleDownvote = async () => {
    await axios.post("/api/reddit", {
      method: "POST",
      path: "/api/vote",
      query: {
        dir: comment.data.likes === false ? 0 : -1,
        id: comment.data.name,
        rank: 10,
        header: null,
      },
    });
  };

  let upvoteTextColor = "";
  if (comment.data.likes === true) upvoteTextColor = "orange";
  else if (comment.data.likes === false) upvoteTextColor = "lightblue";

  const result = useMemo(() => {
    return (
      <CommentCard
        commentContent={
          <>
            <HStack filter={disabled ? "auto" : "none"} brightness="50%">
              <RedditAvatar username={comment.data.author} />
              <HStack display="inline" divider={<> &middot; </>}>
                <Heading size="sm" display="inline">
                  {comment.data.author}
                </Heading>
                <Heading size="sm" display="inline" color="gray">
                  {getElapsedString(comment.data.created_utc)}
                </Heading>
                {comment.data.edited && (
                  <Heading size="sm" display="inline" color="gray">
                    {getElapsedString(comment.data.edited)}
                  </Heading>
                )}
              </HStack>
            </HStack>
            <Box
              wordBreak="break-all"
              textOverflow="ellipsis"
              filter={disabled ? "auto" : "none"}
              brightness="50%"
            >
              <SanitizeHTML dirty={comment.data.body_html} />
            </Box>
            <HStack>
              <ButtonGroup size="sm" variant="ghost">
                <HStack spacing="1">
                  <IconButton
                    colorScheme={comment.data.likes === true ? "red" : "black"}
                    icon={<ImArrowUp />}
                    aria-label="upvote"
                    onClick={handleUpvote}
                  />
                  <Text color={upvoteTextColor}>{comment.data.score}</Text>
                  <IconButton
                    colorScheme={
                      comment.data.likes === false ? "blue" : "black"
                    }
                    icon={<ImArrowDown />}
                    aria-label="downvote"
                    onClick={handleDownvote}
                  />
                </HStack>
              </ButtonGroup>
              <Spacer />
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline">
                    <HStack divider={<StackDivider />}>
                      <Box>
                        <Text>{`Sen.: ${textSentiment.comparative.toFixed(
                          3
                        )}`}</Text>
                      </Box>
                      <Box>
                        <Text>{`Agg Sen.: ${textSentiment.comparative.toFixed(
                          3
                        )}`}</Text>
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
          </>
        }
        commentReplies={
          <VStack>
            {comment.data.replies && (
              <CommentListing
                initialComments={comment.data.replies}
                article={article}
              />
            )}
          </VStack>
        }
      />
    );
  }, [comment, disabled]);

  return result;
};

export default Comment;
