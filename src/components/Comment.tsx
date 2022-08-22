import { Box, HStack, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

import { RedditComment } from "../lib/reddit/redditDataStructs";
import { getElapsedString } from "../lib/utils/getElapsedString";
import CommentSkeleton from "./CommentSkeleton";
import Comments from "./Comments";
import RedditAvatar from "./RedditAvatar";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  comment?: RedditComment;
  article: string;
};

const Comment: FC<Props> = ({ comment, article }) => {
  if (!comment) {
    return (
      <Box w="full">
        <CommentSkeleton />
      </Box>
    );
  }

  return (
    <Box borderTopWidth={1} borderLeftWidth={1} borderColor="blue" w="full">
      <Box pt="2" pl="2">
        <HStack>
          <RedditAvatar username={comment.data.author} />
          <HStack ml="1" display="inline" divider={<> &middot; </>}>
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
        <Box>
          <SanitizeHTML dirty={comment.data.body_html} />
        </Box>
        <HStack p="1" bgColor="green.100">
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
          </Box>
        </HStack>
      </Box>
      {comment.data.replies && (
        <Box pl={2}>
          <Comments
            initialComments={comment.data.replies}
            subreddit={comment.data.subreddit}
            article={article}
          />
        </Box>
      )}
    </Box>
  );
};

export default Comment;
