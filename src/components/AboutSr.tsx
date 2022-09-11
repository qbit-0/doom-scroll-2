import { Heading, SkeletonText } from "@chakra-ui/react";
import { FC, useContext } from "react";

import { SubredditContext } from "../lib/context/SubredditProvider";
import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {};

const AboutSubreddit: FC<Props> = () => {
  const { subredditAbout } = useContext(SubredditContext);

  return (
    <Card>
      <Heading size="lg">About Community</Heading>
      {subredditAbout ? (
        <SanitizeHTML dirty={subredditAbout.data.public_description_html} />
      ) : (
        <SkeletonText noOfLines={4} />
      )}
    </Card>
  );
};

export default AboutSubreddit;
