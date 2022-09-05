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
import { FC, useContext, useMemo } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import Sentiment from "sentiment";

import { CommentsFilterContext } from "../lib/context/CommentsFilterProvider";
import { RedditComment } from "../lib/reddit/redditDataStructs";
import { getElapsedString } from "../lib/utils/getElapsedString";
import Card from "./Card";
import Comments from "./Comments";
import RedditAvatar from "./RedditAvatar";
import SanitizeHTML from "./SanitizeHTML";

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

  const result = useMemo(() => {
    return (
      <Card
        borderWidth={1}
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
                <IconButton icon={<Icon as={BiUpvote} />} aria-label="upvote" />
                <Text>{comment.data.score}</Text>
                <IconButton
                  icon={<Icon as={BiDownvote} />}
                  aria-label="downvote"
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
          <Box>
            <Comments
              initialComments={comment.data.replies}
              subreddit={comment.data.subreddit}
              article={article}
            />
          </Box>
        )}
      </Card>
    );
  }, [comment, disabled]);

  return result;
};

export default Comment;
