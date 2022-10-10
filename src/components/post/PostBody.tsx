import { Box, Flex, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

import { RedditLink } from "../../lib/reddit/redditDataStructs";
import Carousel from "../Carousel";
import CustomImage from "../CustomImage";
import SanitizeHTML from "../SanitizeHTML";

type Props = {
  post: RedditLink;
};

const PostBody: FC<Props> = ({ post }) => {
  const postLinkBgColor = useColorModeValue("white", "gray.600");

  if (post.data?.post_hint === "image") {
    return (
      <>
        <Flex maxH="xs" justify="center">
          <CustomImage
            src={post.data.url_overridden_by_dest}
            blur={post.data.spoiler}
          />
        </Flex>
        {post.data?.selftext_html && (
          <Flex p="4" justify="center" maxH="xs" overflowY="auto">
            <SanitizeHTML dirty={post.data.selftext_html} />
          </Flex>
        )}
      </>
    );
  }

  if (post.data?.media?.oembed?.html) {
    return (
      <Flex justify="center" maxH="md">
        <SanitizeHTML dirty={post.data.media.oembed.html} />
      </Flex>
    );
  }

  if (post.data?.post_hint === "link") {
    return (
      <Flex
        bgColor={postLinkBgColor}
        onClick={() => {
          window.open(post.data.url_overridden_by_dest, "_blank");
        }}
        cursor="pointer"
        h="32"
      >
        <Link flex="1" p="2" wordBreak="break-word">
          {post.data.url_overridden_by_dest}
        </Link>
        {post.data?.preview?.images?.[0]?.source?.url && (
          <Image
            maxW="25%"
            maxH="full"
            src={post.data.preview.images[0].source.url}
            alt="post image"
            objectFit="cover"
            dropShadow="lg"
          />
        )}
      </Flex>
    );
  }

  if (post.data?.selftext_html) {
    return (
      <Flex p="4" maxH="xs" overflowY="auto">
        <SanitizeHTML dirty={post.data.selftext_html} />
      </Flex>
    );
  }

  if (post.data?.media?.reddit_video?.dash_url) {
    return (
      <Box display="flex" justifyContent="center" maxH="2xl">
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
      <Box w={["xs", "sm", "lg"]} mx="auto">
        <Carousel
          srcs={Object.values(post.data.gallery_data.items)
            .filter(
              ({ media_id }: any) =>
                post.data?.media_metadata?.[media_id]?.status === "valid"
            )
            .map(
              ({ media_id }: any) =>
                post.data.media_metadata?.[media_id]?.s?.u as string
            )}
        />
      </Box>
    );
  }

  if (
    post.data?.thumbnail !== "default" &&
    post.data?.thumbnail !== "self" &&
    post.data?.thumbnail !== "nsfw" &&
    post.data?.thumbnail !== ""
  ) {
    return (
      <Image
        src={post.data.thumbnail}
        alt="post image"
        objectFit="contain"
        dropShadow="lg"
        onClick={() => {
          window.open(post.data.url_overridden_by_dest, "_blank");
        }}
      />
    );
  }

  return null;
};

export default PostBody;
