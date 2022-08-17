import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const CommentSkeleton = () => {
  return (
    <Box p="4">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} />
    </Box>
  );
};

export default CommentSkeleton;
