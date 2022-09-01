import { BoxProps, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = BoxProps;

const CommentSkeleton: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} />
    </Card>
  );
};

export default CommentSkeleton;
