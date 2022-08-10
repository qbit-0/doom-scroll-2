export const buildUrlPath = (path: string, query: Record<string, string>) => {
    return Object.entries(query).length
        ? path + `?${new URLSearchParams(query).toString()}`
        : path;
};

export const getHomePath = (sort: string, time: string) => {
    sort = sort || "best";
    time = time || "day";

    let path = "/";
    if (sort !== "best") path += sort;

    const query: Record<string, string> = {};
    if (sort === "top" && time) query["t"] = time;

    const fullpath = buildUrlPath(path, query);
    return { path, query, fullpath };
};

export const getSubredditPath = (
    subreddit: string,
    sort: string,
    time: string
) => {
    subreddit = subreddit || "popular";
    sort = sort || "hot";
    time = time || "day";

    let path = "/r/";
    path += subreddit;
    if (sort !== "hot") path += `/${sort}`;

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
