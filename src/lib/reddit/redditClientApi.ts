import axios from "axios";

import {
  getCommentsPath,
  getSearchPath,
  getSearchSubredditsPath,
  getSearchUsersPath,
  getSubredditPath,
} from "./redditUrlUtils";

export const getSubredditPosts = async (
  subreddit: string,
  sort: string,
  time: string,
  after?: string
) => {
  const { path, query } = getSubredditPath(subreddit, sort, time, after);
  const postsResponse = await axios.post("/api/reddit", {
    method: "GET",
    path: path,
    query: query,
  });
  return postsResponse;
};

export const getSearchPosts = async (
  searchQuery: string,
  sort: string,
  time: string,
  after?: string
) => {
  const { path, query } = getSearchPath(searchQuery, sort, time, after);
  const postsResponse = await axios.post("/api/reddit", {
    method: "GET",
    path: path,
    query: query,
  });
  return postsResponse;
};

export const getComments = async (
  subreddit: string,
  article: string,
  commentId?: string
) => {
  const { path, query } = getCommentsPath(subreddit, article, commentId);

  const commentsResponse = await axios.post("/api/reddit", {
    method: "GET",
    path: path,
    query: query,
  });

  return commentsResponse;
};

export const getMore = async (
  moreId: string,
  article: string,
  childrenIds: string[]
) => {
  const moreResponse = await axios.post("/api/reddit", {
    method: "POST",
    path: "/api/morechildren",
    query: {
      api_type: "json",
      id: moreId,
      link_id: `t3_${article}`,
    },
    data: new URLSearchParams({
      children: childrenIds.join(","),
    }).toString(),
  });

  return moreResponse;
};

export const getSearchSubreddits = async (
  searchQuery: string,
  after?: string
) => {
  const { path, query } = getSearchSubredditsPath(searchQuery, after);
  const subredditsResponse = await axios.post("/api/reddit", {
    method: "GET",
    path: path,
    query: query,
  });
  return subredditsResponse;
};

export const getSearchUsers = async (searchQuery: string, after?: string) => {
  const { path, query } = getSearchUsersPath(searchQuery, after);
  const usersResponse = await axios.post("/api/reddit", {
    method: "GET",
    path: path,
    query: query,
  });
  return usersResponse;
};
