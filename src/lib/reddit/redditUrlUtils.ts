export const getPathname = ({
  pathname,
  query,
}: {
  pathname: string;
  query: Record<string, string>;
}) => {
  return Object.entries(query).length
    ? pathname + `?${new URLSearchParams(query).toString()}`
    : pathname;
};

export const getSubredditPath = (
  subreddit: string,
  sort: string,
  time: string,
  after?: string
) => {
  let pathname = !subreddit ? "" : `/r/${subreddit}`;
  pathname += `/${sort}`;

  const query: Record<string, string> = {};
  query["t"] = time;
  query["sr_detail"] = "true";
  if (after) query["after"] = after;

  return { pathname, query };
};

export const getSearchPostsPath = (
  searchQuery: string,
  sort: string,
  time: string,
  type: string,
  after?: string
) => {
  sort = sort || "relevance";
  time = time || "all";
  type = type || "link";

  const pathname = "/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = sort;
  query["t"] = time;
  query["sr_detail"] = "true";
  query["type"] = type;
  if (after) query["after"] = after;

  return { pathname, query };
};

export const getCommentsPath = (
  subreddit: string,
  article: string,
  commentId?: string,
  sort = "best"
) => {
  let pathname = `/r/${subreddit}/comments/${article}`;
  if (commentId) {
    pathname += `/comment/${commentId}`;
  }

  const query: Record<string, string> = {};
  query["sort"] = sort;
  query["sr_detail"] = "true";
  return { pathname, query };
};

export const getSearchSubredditsPath = (
  searchQuery: string,
  after?: string
) => {
  const pathname = "/subreddits/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = "relevance";
  query["sr_detail"] = "true";
  if (after) query["after"] = after;

  return { pathname, query };
};

export const getSearchUsersPath = (searchQuery: string, after?: string) => {
  const pathname = "/users/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = "relevance";
  if (after) query["after"] = after;
  return { pathname, query };
};
