import {
  Box,
  BoxProps,
  ButtonGroup,
  HStack,
  Heading,
  Icon,
  IconButton,
  Spacer,
  Text,
  useConst,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useContext, useMemo } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import Sentiment from "sentiment";

import { CommentsFilterContext } from "../lib/context/CommentsFilterProvider";
import { RedditComment } from "../lib/reddit/redditDataStructs";
import { getElapsedString } from "../lib/utils/getElapsedString";
import Card from "./Card";
import RedditAvatar from "./RedditAvatar";
import SanitizeHTML from "./SanitizeHTML";
import Comments from "./panel_collection/Comments";

type Props = {
  article: string;
  comment: RedditComment;
} & BoxProps;

const Comment: FC<Props> = ({ article, comment, ...innerProps }) => {
  const { commentsFilter } = useContext(CommentsFilterContext);
  const sentiment = useConst(() => new Sentiment());

  const commentSentiment = useMemo(
    () => sentiment.analyze(comment.data.body),
    [comment.data.body]
  );

  const disabled =
    Math.tanh(comment.data.score) < commentsFilter.minCommentScore ||
    Math.tanh(comment.data.score) > commentsFilter.maxCommentScore ||
    (commentSentiment &&
      (commentSentiment.comparative < commentsFilter.minTextSentiment ||
        commentSentiment.comparative > commentsFilter.maxTextSentiment));

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
      <Card
        borderWidth={0}
        borderLeftWidth={1}
        roundedLeft="none"
        borderColor="gray.500"
        p="1"
        disabled={disabled}
        changeBgWhenDisabled
        {...innerProps}
      >
        <Box
          filter={disabled ? "auto" : "none"}
          brightness={disabled ? "50%" : "none"}
        >
          <HStack>
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
          <Box wordBreak="break-all" textOverflow="ellipsis">
            <SanitizeHTML dirty={comment.data.body_html} />
          </Box>
          <HStack mb="1">
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
                  colorScheme={comment.data.likes === false ? "blue" : "black"}
                  icon={<ImArrowDown />}
                  aria-label="downvote"
                  onClick={handleDownvote}
                />
              </HStack>
            </ButtonGroup>
            <Spacer />
            {commentSentiment && (
              <HStack>
                <Text>Sen.:</Text>
                <Text>{`${commentSentiment.comparative.toFixed(3)}`}</Text>
              </HStack>
            )}
          </HStack>
        </Box>

        {comment.data.replies && (
          <Comments
            initialComments={comment.data.replies}
            subreddit={comment.data.subreddit}
            article={article}
          />
        )}
      </Card>
    );
  }, [comment, disabled]);

  return result;
};

export default Comment;
