import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const PostSkeleton = () => {
  return (
    <Box p="4">
      <SkeletonCircle size="10" />
      <Skeleton mt="4" height="96" />
    </Box>
  );
};

export default PostSkeleton;
