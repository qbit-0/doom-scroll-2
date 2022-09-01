import {
  Box,
  BoxProps,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

import { CommentsFilterContext } from "../lib/context/CommentsFilterProvider";
import useNlp from "../lib/hooks/useNlp";
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
  const { data: commentNlp } = useNlp(comment.data.body);

  const disabled =
    Math.tanh(comment.data.score) < commentsFilter.minCommentScore ||
    Math.tanh(comment.data.score) > commentsFilter.maxCommentScore ||
    (commentNlp &&
      (commentNlp.sentiment < commentsFilter.minCommentSentiment ||
        commentNlp.sentiment > commentsFilter.maxCommentSentiment));

  return (
    <Card
      borderWidth={1}
      borderColor="gray.500"
      p="1"
      disabled={disabled}
      {...innerProps}
    >
      <Box>
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
        <HStack p="1">
          <Box>
            <IconButton
              display="inline"
              icon={<Icon as={BiUpvote} />}
              aria-label="upvote"
            />
            <Text display="inline">{comment.data.score}</Text>
            <IconButton
              display="inline"
              icon={<Icon as={BiDownvote} />}
              aria-label="downvote"
            />
            {commentNlp && (
              <Text display="inline">{`Comment Sentiment: ${commentNlp.sentiment.toFixed(
                3
              )}`}</Text>
            )}
          </Box>
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
};

export default Comment;
