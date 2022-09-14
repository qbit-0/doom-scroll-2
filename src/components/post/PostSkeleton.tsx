import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { FC } from "react";

import ContentCard from "../../ContentCard";

type Props = {};

const PostSkeleton: FC<Props> = () => {
  return (
    <ContentCard boxProps={{ p: "0" }}>
      <SkeletonCircle size="10" />
      <Skeleton mt="4" height="96" />
    </ContentCard>
  );
};

export default PostSkeleton;
