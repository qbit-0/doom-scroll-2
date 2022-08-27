import { PropsOf, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const PostSkeleton: FC<Props> = (props) => {
  return (
    <Card p="4" {...props}>
      <SkeletonCircle size="10" />
      <Skeleton mt="4" height="96" />
    </Card>
  );
};

export default PostSkeleton;
