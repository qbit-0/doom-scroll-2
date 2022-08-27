import { Heading, PropsOf, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";

import { RedditSubreddit } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  subredditAbout?: RedditSubreddit;
} & PropsOf<typeof Card>;

const SubredditAbout: FC<Props> = ({ subredditAbout, ...innerProps }) => {
  return (
    <Card {...innerProps}>
      <Heading>About Community</Heading>
      {subredditAbout ? (
        <SanitizeHTML dirty={subredditAbout.data.public_description_html} />
      ) : (
        <SkeletonText noOfLines={4} />
      )}
    </Card>
  );
};

export default SubredditAbout;
