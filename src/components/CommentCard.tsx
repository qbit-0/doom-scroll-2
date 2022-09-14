import {
  Box,
  BoxProps,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  commentContent?: React.ReactNode;
  commentReplies?: React.ReactNode;
  boxProps?: BoxProps;
};

const CommentCard: FC<Props> = ({
  commentContent: commentContent,
  commentReplies,
  boxProps,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      w="full"
      borderTopWidth={1}
      borderLeftWidth={1}
      pt="2"
      pb="2"
      pl="2"
      roundedTopLeft={["none", "none", "md"]}
      shadow="md"
      borderColor="gray.500"
      bgColor={bgColor}
      boxShadow="md"
      overflow="hidden"
      {...boxProps}
    >
      <Box pr="2" pb="2">
        {commentContent}
      </Box>
      {commentReplies}
    </Box>
  );
};

export default CommentCard;
