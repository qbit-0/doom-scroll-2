export const REDDIT_URL_PARAMS = {
  "/[[...sort]]": {
    sort: ["best", "hot", "new", "top", "rising"] as const,
    t: ["hour", "day", "week", "month", "year", "all"] as const,
  },
  "/r/[subreddit]/[[...sort]]": {
    sort: ["hot", "new", "top", "rising"] as const,
    t: ["hour", "day", "week", "month", "year", "all"] as const,
  },
  "/search": {
    type: ["link", "sr", "user"] as const,
    sort: ["relevance", "hot", "top", "new", "comments"] as const,
    t: ["all", "year", "month", "week", "day", "hour"] as const,
  },
};
