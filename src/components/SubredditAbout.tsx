import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  about: any;
};

const SubredditAbout: FC<Props> = ({ about }) => {
  return (
    <Card>
      <Heading>About Community</Heading>
      {about && (
        <SanitizeHTML dirty={about["data"]["public_description_html"]} />
      )}
    </Card>
  );
};

export default SubredditAbout;
