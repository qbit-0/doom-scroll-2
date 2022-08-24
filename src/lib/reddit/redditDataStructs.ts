export const genCommentTrees = (comments: any) => {
  const lastDepths: Record<number, any> = {};
  const commentsTrees: (RedditComment | RedditMore)[] = [];

  comments.forEach((comment: RedditComment | RedditMore) => {
    const parent = lastDepths[comment.data.depth - 1];
    if (!parent) commentsTrees.push(comment);
    else if (!parent.data.replies) {
      parent.data.replies = {
        kind: "Listing",
        data: {
          after: null,
          before: null,
          children: [comment],
          dist: null,
          geo_filter: "",
          modhash: null,
        },
      };
    } else {
      parent.data.replies.data.children.push(comment);
    }
    lastDepths[comment.data.depth] = comment;
  });

  return commentsTrees;
};

export type RedditComment = {
  kind: "t1";
  data: {
    author: string;
    body_html: string;
    created_utc: number;
    depth: number;
    edited?: number;
    link_id: string;
    replies: RedditListing<RedditComment | RedditMore> | "";
    score: number;
    subreddit: string;
  };
};

export type RedditAccount = {
  kind: "t2";
  data: {
    icon_img: string;
    name: string;
  };
};

export type RedditLink = {
  kind: "t3";
  data: {
    author: string;
    created_utc: number;
    gallery_data?: {
      items?: {};
    };
    id: string;
    media?: {
      oembed?: {
        html?: string;
      };
      reddit_video?: {
        dash_url?: string;
        fallback_url?: string;
        hls_url?: string;
        scrubber_media_url?: string;
        width?: number;
        height?: number;
      };
    };
    media_metadata?: {
      s?: {
        u?: string;
      };
      status?: string;
    }[];
    num_comments: number;
    post_hint: string;
    preview?: {
      images?: {
        source?: {
          url?: string;
        };
      }[];
    };
    title: string;
    thumbnail: string;
    upvote_ratio: number;
    url_overridden_by_dest: string;
    score: number;
    selftext_html?: string;
    sr_detail?: RedditSubreddit["data"];
    subreddit: string;
  };
};

export type RedditSubreddit = {
  data: {
    banner_background_color: string;
    banner_background_image: string;
    community_icon: string;
    display_name: string;
    header_img: string;
    icon_img: string;
    primary_color: string;
    public_description_html: string;
    title: string;
  };
};

export type RedditListing<T> = {
  before: string;
  after: string;
  geo_filter: string;
  kind: "Listing";
  data: {
    children: T[];
  };
};

export type RedditMore = {
  data: {
    children: string[];
    count: number;
    depth: number;
    id: string;
    parent_id: string;
  };
  kind: "more";
};

export type RedditRule = {
  rules: {
    kind: "all";
    description: string;
    short_name: string;
    violation_reason: string;
    created_utc: number;
    priority: number;
    description_html: string;
  }[];
  site_rules: [];
  site_rules_flow: [];
};

export type RedditMe = {
  name: string;
};
