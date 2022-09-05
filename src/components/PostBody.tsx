import { Box, BoxProps, Flex, HStack, Image, Link } from "@chakra-ui/react";
import { FC } from "react";

import { RedditLink } from "../lib/reddit/redditDataStructs";
import Carousel from "./Carousel";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: RedditLink;
} & BoxProps;

const PostBody: FC<Props> = ({ post, ...innerProps }) => {
  const getInnerBody = () => {
    if (post.data?.post_hint === "image") {
      return (
        <>
          <Flex maxH="xl">
            <Image
              src={post.data.url_overridden_by_dest}
              alt="post image"
              objectFit="contain"
              dropShadow="lg"
              onClick={() =>
                window.open(post.data.url_overridden_by_dest, "_blank")
              }
              cursor="pointer"
            />
          </Flex>
          {post.data?.selftext_html && (
            <SanitizeHTML
              display="flex"
              p="4"
              justifyContent="center"
              maxH="2xl"
              overflowY="auto"
              dirty={post.data.selftext_html}
            />
          )}
        </>
      );
    }

    if (post.data?.post_hint === "link") {
      return (
        <HStack
          bgColor="gray.600"
          onClick={() => {
            window.open(post.data.url_overridden_by_dest, "_blank");
          }}
          cursor="pointer"
        >
          <Link p="2" w="xs">
            {post.data.url_overridden_by_dest}
          </Link>
          {post.data?.preview?.images?.[0]?.source?.url && (
            <Box>
              <Image
                src={post.data.preview.images[0].source.url}
                alt="post image"
                objectFit="contain"
                dropShadow="lg"
              />
            </Box>
          )}
        </HStack>
      );
    }

    if (post.data?.selftext_html) {
      return (
        <SanitizeHTML
          display="flex"
          p="4"
          maxH="2xl"
          overflowY="auto"
          dirty={post.data.selftext_html}
        />
      );
    }

    if (post.data?.media?.oembed?.html) {
      return (
        <SanitizeHTML
          display="flex"
          p="4"
          justifyContent="center"
          maxH="2xl"
          dirty={post.data.media.oembed.html}
        />
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
        <Carousel
          mx="auto"
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
      );
    }

    // if (
    //   post.data?.thumbnail !== "default" &&
    //   post.data?.thumbnail !== "self" &&
    //   post.data?.thumbnail !== "nsfw" &&
    //   post.data?.thumbnail !== ""
    // ) {
    //   return (
    //     <Image
    //       src={post.data.thumbnail}
    //       alt="post image"
    //       objectFit="contain"
    //       dropShadow="lg"
    //       onClick={() => {
    //         window.open(post.data.url_overridden_by_dest, "_blank");
    //       }}
    //     />
    //   );
    // }

    return null;
  };

  return <Box {...innerProps}>{getInnerBody()}</Box>;
};

export default PostBody;
