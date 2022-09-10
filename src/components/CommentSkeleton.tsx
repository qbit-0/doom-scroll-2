import { BoxProps, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const CommentSkeleton: FC<Props> = () => {
  return (
    <Card>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} />
    </Card>
  );
};

export default CommentSkeleton;
