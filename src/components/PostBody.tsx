import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

import { RedditLink } from "../lib/reddit/redditDataStructs";
import Gallery from "./Gallery";
import ImagePreview from "./ImagePreview";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: RedditLink;
} & BoxProps;

const PostBody: FC<Props> = ({ post, ...innerProps }) => {
  if (post.data?.selftext_html) {
    return (
      <SanitizeHTML
        display="flex"
        justifyContent="center"
        maxH="2xl"
        overflowY="scroll"
        dirty={post.data.selftext_html}
        {...innerProps}
      />
    );
  }

  if (post.data?.media?.oembed?.html) {
    return (
      <SanitizeHTML
        display="flex"
        justifyContent="center"
        maxH="2xl"
        dirty={post.data.media.oembed.html}
      />
    );
  }

  if (post.data?.media?.reddit_video?.dash_url) {
    return (
      <Box display="flex" justifyContent="center" maxH="2xl" {...innerProps}>
        <video
          playsInline
          width={post.data.media.reddit_video.width}
          height={post.data.media.reddit_video.height}
          loop
          preload="auto"
          controls
          poster={post.data?.preview?.images?.[0]?.source?.url}
        >
          <source src={post.data.media.reddit_video.dash_url} />
          <source src={post.data.media.reddit_video.hls_url} />
          <source src={post.data.media.reddit_video.fallback_url} />
          <source src={post.data.media.reddit_video.scrubber_media_url} />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }

  if (post.data?.gallery_data?.items) {
    return (
      <Gallery
        justifyContent="center"
        maxH="2xl"
        srcs={Object.values(post.data.gallery_data.items)
          .filter(
            ({ media_id }: any) =>
              post.data?.media_metadata?.[media_id]?.status === "valid"
          )
          .map(
            ({ media_id }: any) =>
              post.data.media_metadata?.[media_id]?.s?.u as string
          )}
        {...innerProps}
      />
    );
  }

  if (post.data?.post_hint === "image") {
    return (
      <ImagePreview
        display="flex"
        justifyContent="center"
        maxH="2xl"
        src={post.data.url_overridden_by_dest}
        href={post.data.url_overridden_by_dest}
        {...innerProps}
      />
    );
  }

  if (post.data?.preview?.images?.[0]?.source?.url) {
    return (
      <ImagePreview
        display="flex"
        justifyContent="center"
        maxH="2xl"
        src={post.data.preview.images[0].source.url}
        href={post.data.url_overridden_by_dest}
        {...innerProps}
      />
    );
  }

  if (
    post.data?.thumbnail !== "default" &&
    post.data?.thumbnail !== "self" &&
    post.data?.thumbnail !== "nsfw" &&
    post.data?.thumbnail !== ""
  ) {
    return (
      <ImagePreview
        display="flex"
        justifyContent="center"
        maxH="2xl"
        src={post.data.thumbnail}
        href={post.data.url_overridden_by_dest}
        {...innerProps}
      />
    );
  }

  return null;
};

export default PostBody;
