import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type PostsFilter = {
  id: number | null;
  minUpvoteRatio: number;
  maxUpvoteRatio: number;
  minTextSentiment: number;
  maxTextSentiment: number;
  minAggSentiment: number;
  maxAggSentiment: number;
};

export const defaultPostsPreset: PostsFilter = {
  id: 0,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -1,
  maxTextSentiment: 1,
  minAggSentiment: -1,
  maxAggSentiment: 1,
};

export const positivePostsPreset: PostsFilter = {
  id: 1,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -1,
  maxTextSentiment: 1,
  minAggSentiment: 0,
  maxAggSentiment: 1,
};

export const negativePostsPreset: PostsFilter = {
  id: 2,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -1,
  maxTextSentiment: 1,
  minAggSentiment: -1,
  maxAggSentiment: 0,
};
export const PostsFilterContext = createContext<{
  postsFilter: PostsFilter;
  setPostsFilter: Dispatch<SetStateAction<PostsFilter>>;
}>({} as any);

type Props = {
  children: React.ReactNode;
};

const PostsFilterProvider: FC<Props> = ({ children }) => {
  const [postsFilter, setPostsFilter] =
    useState<PostsFilter>(defaultPostsPreset);

  return (
    <PostsFilterContext.Provider value={{ postsFilter, setPostsFilter }}>
      {children}
    </PostsFilterContext.Provider>
  );
};

export default PostsFilterProvider;
