import { Box, BoxProps, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";

type Props = BoxProps;

const CommentSkeleton: FC<Props> = (props) => {
  return (
    <Box p="4" w="full" {...props}>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} />
    </Box>
  );
};

export default CommentSkeleton;
