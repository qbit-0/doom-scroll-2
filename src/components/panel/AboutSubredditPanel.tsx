import { Heading, PropsOf, SkeletonText } from "@chakra-ui/react";
import { FC, useContext } from "react";

import { SubredditContext } from "../../lib/context/SubredditProvider";
import Card from "../Card";
import SanitizeHTML from "../SanitizeHTML";

type Props = PropsOf<typeof Card>;

const AboutSubredditPanel: FC<Props> = (props) => {
  const { subredditAbout } = useContext(SubredditContext);

  return (
    <Card {...props}>
      <Heading size="lg">About Community</Heading>
      {subredditAbout ? (
        <SanitizeHTML dirty={subredditAbout.data.public_description_html} />
      ) : (
        <SkeletonText noOfLines={4} />
      )}
    </Card>
  );
};

export default AboutSubredditPanel;
