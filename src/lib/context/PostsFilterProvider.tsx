import React, { FC, createContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export type PostsFilter = {
  id: number | null;
  minScore: number;
  maxScore: number;
  minUpvoteRatio: number;
  maxUpvoteRatio: number;
  minTextSentiment: number;
  maxTextSentiment: number;
  minAggSentiment: number;
  maxAggSentiment: number;
};

export const defaultPostsPreset: PostsFilter = {
  id: 0,
  minScore: -10000000000,
  maxScore: 10000000000,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: -1,
  maxAggSentiment: 1,
};

export const positivePostsPreset: PostsFilter = {
  id: 1,
  minScore: -10000000000,
  maxScore: 10000000000,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: 0,
  maxAggSentiment: 1,
};

export const negativePostsPreset: PostsFilter = {
  id: 2,
  minScore: -10000000000,
  maxScore: 10000000000,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: -1,
  maxAggSentiment: 0,
};

interface PostsFilterContextInterface {
  postsFilter: PostsFilter;
  setPostsFilter: (postsFilter: PostsFilter) => void;
}

export const PostsFilterContext = createContext(
  {} as PostsFilterContextInterface
);

type Props = {
  children: React.ReactNode;
};

const PostsFilterProvider: FC<Props> = ({ children }) => {
  const [postsFilter, setPostsFilter] =
    useLocalStorage<PostsFilter>("postsFilter");

  console.log(postsFilter);

  return (
    <PostsFilterContext.Provider
      value={{
        postsFilter:
          postsFilter === undefined || postsFilter === null
            ? defaultPostsPreset
            : postsFilter,
        setPostsFilter,
      }}
    >
      {children}
    </PostsFilterContext.Provider>
  );
};

export default PostsFilterProvider;
