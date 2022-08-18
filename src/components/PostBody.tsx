import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

import Gallery from "./Gallery";
import ImagePreview from "./ImagePreview";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: any;
};

const PostBody: FC<Props> = ({ post }) => {
  if (post["data"]?.["selftext_html"]) {
    return (
      <Flex w="full" maxH="96" overflow="auto" textOverflow="ellipsis">
        <Box w="md" mx="auto">
          <SanitizeHTML dirty={post["data"]["selftext_html"]} />
        </Box>
      </Flex>
    );
  }

  if (post["data"]?.["media"]?.["oembed"]?.["html"]) {
    return (
      <Flex maxH="96" overflow="auto">
        <SanitizeHTML dirty={post["data"]["media"]["oembed"]["html"]} />
      </Flex>
    );
  }

  if (post["data"]?.["media"]?.["reddit_video"]?.["dash_url"]) {
    return (
      <Flex justifyContent="center" maxH="96" w="md" mx="auto">
        <video
          playsInline
          width={post["data"]["media"]["reddit_video"]["width"]}
          height={post["data"]["media"]["reddit_video"]["height"]}
          muted
          loop
          preload="auto"
          controls
          poster={post["data"]["preview"]["images"]["0"]["source"]["url"]}
        >
          <source src={post["data"]["media"]["reddit_video"]["dash_url"]} />
          <source src={post["data"]["media"]["reddit_video"]["hls_url"]} />
          <source src={post["data"]["media"]["reddit_video"]["fallback_url"]} />
          <source
            src={post["data"]["media"]["reddit_video"]["scrubber_media_url"]}
          />
          Your browser does not support the video tag.
        </video>
      </Flex>
    );
  }

  if (post["data"]?.["gallery_data"]?.["items"]) {
    return (
      <Flex justifyContent="center">
        <Gallery
          srcs={Object.values(post["data"]["gallery_data"]["items"])
            .filter(
              ({ media_id }: any) =>
                post["data"]["media_metadata"][media_id]["status"] === "valid"
            )
            .map(
              ({ media_id }: any) =>
                post["data"]["media_metadata"][media_id]["s"]["u"]
            )}
        />
      </Flex>
    );
  }

  if (post["data"]?.["post_hint"] === "image") {
    return (
      <Flex justifyContent="center" maxH="96">
        <ImagePreview
          src={post["data"]["url_overridden_by_dest"]}
          href={post["data"]["url_overridden_by_dest"]}
        />
      </Flex>
    );
  }

  if (post["data"]?.["preview"]?.["images"]?.["0"]?.["source"]?.["url"]) {
    return (
      <Flex justifyContent="center" maxH="96">
        <ImagePreview
          src={post["data"]["preview"]["images"]["0"]["source"]["url"]}
          href={post["data"]["url_overridden_by_dest"]}
        />
      </Flex>
    );
  }

  if (
    post["data"]?.["thumbnail"] !== "default" &&
    post["data"]?.["thumbnail"] !== "self" &&
    post["data"]?.["thumbnail"] !== "nsfw" &&
    post["data"]?.["thumbnail"] !== ""
  ) {
    return (
      <Flex justifyContent="center" maxH="96">
        <ImagePreview
          src={post["data"]["thumbnail"]}
          href={post["data"]["url_overridden_by_dest"]}
        />
      </Flex>
    );
  }

  return null;
};

export default PostBody;
