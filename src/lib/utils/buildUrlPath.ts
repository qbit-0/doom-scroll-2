const buildUrlPath = (path: string, query: Record<string, string>) => {
  return Object.entries(query).length
    ? path + `?${new URLSearchParams(query).toString()}`
    : path;
};

export default buildUrlPath;
