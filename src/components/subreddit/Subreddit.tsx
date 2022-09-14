import { Avatar, Box, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

import ContentCard from "../../ContentCard";
import { RedditSubreddit } from "../../lib/reddit/redditDataStructs";
import SanitizeHTML from "../SanitizeHTML";

type Props = { subreddit: RedditSubreddit };

const Subreddit: FC<Props> = ({ subreddit }) => {
  return (
    <ContentCard>
      <NextLink href={`/r/${subreddit.data.display_name}`}>
        <Link>
          <Avatar
            name={"r /"}
            src={subreddit.data?.community_icon || subreddit.data?.icon_img}
            size="sm"
          />
          <Heading>{subreddit.data.display_name}</Heading>
        </Link>
      </NextLink>
      <Box>
        <SanitizeHTML dirty={subreddit.data.public_description_html} />
      </Box>
    </ContentCard>
  );
};

export default Subreddit;
