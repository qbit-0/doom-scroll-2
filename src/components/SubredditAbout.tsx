import { Box, Heading, SkeletonText } from "@chakra-ui/react";
import { FC } from "react";

import { RedditSubreddit } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  about?: RedditSubreddit;
};

const SubredditAbout: FC<Props> = ({ about }) => {
  return (
    <Card>
      <Box p="4">
        <Heading>About Community</Heading>
        {about ? (
          <SanitizeHTML dirty={about.data.public_description_html} />
        ) : (
          <SkeletonText noOfLines={4} />
        )}
      </Box>
    </Card>
  );
};

export default SubredditAbout;
