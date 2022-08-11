export const buildUrlPath = (path: string, query: Record<string, string>) => {
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
  if ((!subreddit && sort !== "best") || (subreddit && sort !== "hot")) {
    path += `/${sort}`;
  }

  const query: Record<string, string> = {};
  if (sort === "top" && time) query["t"] = time;

  const fullpath = buildUrlPath(path, query);
  return { path, query, fullpath };
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
  if (sort !== "relevance") query["sort"] = sort;
  if (time !== "all") query["t"] = time;

  const fullpath = buildUrlPath(path, query);
  return { path, query, fullpath };
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
  if (sort !== "best") query["sort"] = sort;

  const fullpath = buildUrlPath(path, query);
  return { path, query, fullpath };
};
