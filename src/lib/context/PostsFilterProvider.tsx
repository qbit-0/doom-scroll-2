import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type PostsFilter = {
  id: number | null;
  minScore: number | null;
  maxScore: number | null;
  minUpvoteRatio: number;
  maxUpvoteRatio: number;
  minTextSentiment: number;
  maxTextSentiment: number;
  minAggSentiment: number;
  maxAggSentiment: number;
};

export const defaultPostsPreset: PostsFilter = {
  id: 0,
  minScore: null,
  maxScore: null,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: -1,
  maxAggSentiment: 1,
};

export const positivePostsPreset: PostsFilter = {
  id: 1,
  minScore: null,
  maxScore: null,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: 0,
  maxAggSentiment: 1,
};

export const negativePostsPreset: PostsFilter = {
  id: 2,
  minScore: null,
  maxScore: null,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: -1,
  maxAggSentiment: 0,
};

interface PostsFilterContextInterface {
  postsFilter: PostsFilter;
  setPostsFilter: Dispatch<SetStateAction<PostsFilter>>;
}

export const PostsFilterContext = createContext(
  {} as PostsFilterContextInterface
);

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
