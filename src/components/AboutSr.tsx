import { Heading, SkeletonText } from "@chakra-ui/react";
import { FC, useContext } from "react";

import ContentCard from "../ContentCard";
import { SubredditContext } from "../lib/context/SubredditProvider";
import SanitizeHTML from "./SanitizeHTML";

type Props = {};

const AboutSubreddit: FC<Props> = () => {
  const { subredditAbout } = useContext(SubredditContext);

  return (
    <ContentCard>
      <Heading size="lg">About Community</Heading>
      {subredditAbout ? (
        <SanitizeHTML dirty={subredditAbout.data.public_description_html} />
      ) : (
        <SkeletonText noOfLines={4} />
      )}
    </ContentCard>
  );
};

export default AboutSubreddit;
