import { Box, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";
import { FC } from "react";

import CommentCard from "../CommentCard";

type Props = {};

const CommentSkeleton: FC<Props> = () => {
  return (
    <CommentCard
      commentContent={
        <Box pr="2" pb="2">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} />
        </Box>
      }
      commentReplies={
        <VStack>
          <CommentCard
            commentContent={
              <>
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} />
              </>
            }
          />
          <CommentCard
            commentContent={
              <>
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} />
              </>
            }
          />
        </VStack>
      }
    ></CommentCard>
  );
};

export default CommentSkeleton;
