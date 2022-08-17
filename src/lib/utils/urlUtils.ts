export const getPathname = (path: string, query: Record<string, string>) => {
  return Object.entries(query).length
    ? path + `?${new URLSearchParams(query).toString()}`
    : path;
};

export const getSubredditPath = (
  subreddit: string,
  sort: string,
  time: string
) => {
  let path = subreddit === "" ? "" : `/r/${subreddit}`;
  path += `/${sort}`;

  const query: Record<string, string> = {};
  query["t"] = time;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};

export const getSearchPath = (
  searchQuery: string,
  sort: string,
  time: string
) => {
  sort = sort || "relevance";
  time = time || "all";

  let path = "/search";

  const query: Record<string, string> = {};
  query["q"] = searchQuery;
  query["sort"] = sort;
  query["t"] = time;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};

export const getCommentsPath = (
  subreddit: string | undefined | null,
  article: string,
  sort = "best"
) => {
  let path = "";
  if (subreddit) path += `/r/${subreddit}`;
  path += `/comments/${article}`;

  const query: Record<string, string> = {};
  query["sort"] = sort;

  const pathname = getPathname(path, query);
  return { path, query, pathname };
};
