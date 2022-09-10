import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const PostSkeleton: FC<Props> = () => {
  return (
    <Card>
      <SkeletonCircle size="10" />
      <Skeleton mt="4" height="96" />
    </Card>
  );
};

export default PostSkeleton;
