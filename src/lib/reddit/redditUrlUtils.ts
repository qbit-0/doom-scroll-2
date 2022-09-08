export const getPathname = (path: string, query: Record<string, string>) => {
  return Object.entries(query).length
    ? path + `?${new URLSearchParams(query).toString()}`
    : path;
};

export const getSubredditPath = (
  subreddit: string,
  sort: string,
  time: string,
  after?: string
) => {
  let path = !subreddit ? "" : `/r/${subreddit}`;
  path += `/${sort}`;

  const query: Record<string, string> = {};
  query["t"] = time;
  query["sr_detail"] = "true";
  if (after) query["after"] = after;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
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

  const path = "/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = sort;
  query["t"] = time;
  query["sr_detail"] = "true";
  query["type"] = type;
  if (after) query["after"] = after;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};

export const getCommentsPath = (
  subreddit: string,
  article: string,
  commentId?: string,
  sort = "best"
) => {
  let path = `/r/${subreddit}/comments/${article}`;
  if (commentId) {
    path += `/comment/${commentId}`;
  }

  const query: Record<string, string> = {};
  query["sort"] = sort;
  query["sr_detail"] = "true";

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};

export const getSearchSubredditsPath = (
  searchQuery: string,
  after?: string
) => {
  const path = "/subreddits/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = "relevance";
  query["sr_detail"] = "true";
  if (after) query["after"] = after;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};

export const getSearchUsersPath = (searchQuery: string, after?: string) => {
  const path = "/users/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = "relevance";
  if (after) query["after"] = after;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};
