import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

import ImagePreview from "./ImagePreview";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: any;
};

const PostBody: FC<Props> = ({ post }) => {
  if (post["data"]?.["selftext_html"]) {
    return (
      <Box>
        <SanitizeHTML dirty={post["data"]["selftext_html"]} />
      </Box>
    );
  }

  if (post["data"]?.["media"]?.["oembed"]?.["html"]) {
    return (
      <Box>
        <SanitizeHTML dirty={post["data"]["media"]["oembed"]["html"]} />
      </Box>
    );
  }

  if (post["data"]?.["media"]?.["reddit_video"]?.["dash_url"]) {
    return (
      <Box>
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
      </Box>
    );
  }

  // if (post["data"]?.["gallery_data"]?.["items"]) {
  //   return (
  //     <div className="flex justify-center bg-neutral-700">
  //       <Gallery
  //         srcs={Object.values(post["data"]["gallery_data"]["items"])
  //           .filter(
  //             ({ media_id }: any) =>
  //               post["data"]["media_metadata"][media_id]["status"] === "valid"
  //           )
  //           .map(
  //             ({ media_id }: any) =>
  //               post["data"]["media_metadata"][media_id]["s"]["u"]
  //           )}
  //       />
  //     </div>
  //   );
  // }

  if (post["data"]["post_hint"] === "image") {
    return (
      <div>
        <ImagePreview
          src={post["data"]["url_overridden_by_dest"]}
          href={post["data"]["url_overridden_by_dest"]}
        />
      </div>
    );
  }

  // if (post["data"]?.["preview"]?.["images"]?.["0"]?.["source"]?.["url"]) {
  //   return (
  //     <div className="flex justify-center bg-neutral-700">
  //       <ImagePreview
  //         src={post["data"]["preview"]["images"]["0"]["source"]["url"]}
  //         href={post["data"]["url_overridden_by_dest"]}
  //       />
  //     </div>
  //   );
  // }

  // if (
  //   post["data"]?.["thumbnail"] !== "default" &&
  //   post["data"]?.["thumbnail"] !== "self" &&
  //   post["data"]?.["thumbnail"] !== "nsfw" &&
  //   post["data"]?.["thumbnail"] !== ""
  // ) {
  //   return (
  //     <div className="flex justify-center bg-neutral-700">
  //       <ImagePreview
  //         src={post["data"]["thumbnail"]}
  //         href={post["data"]["url_overridden_by_dest"]}
  //       />
  //     </div>
  //   );
  // }

  return null;
};

export default PostBody;
