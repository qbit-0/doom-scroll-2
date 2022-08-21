import { Box, Heading, SkeletonText } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  subreddit?: string;
};

const SubredditAbout: FC<Props> = ({ subreddit }) => {
  const [about, setAbout] = useState<any | null>(null);

  useEffect(() => {
    if (!subreddit) return;

    (async () => {
      const aboutResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/r/${subreddit}/about`,
      });
      setAbout(aboutResponse.data);
    })();
  }, [subreddit]);

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
