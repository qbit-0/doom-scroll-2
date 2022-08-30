import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import React from "react";

export type PostsFilter = {
  id: number | null;
  minUpvoteRatio: number;
  maxUpvoteRatio: number;
  minTitleSentiment: number;
  maxTitleSentiment: number;
  minCommentsSentiment: number;
  maxCommentsSentiment: number;
  minAggregateSentiment: number;
  maxAggregateSentiment: number;
  upvoteRatioWeight: number;
  titleSentimentWeight: number;
  commentsSentimentWeight: number;
};

export const defaultPostsPreset: PostsFilter = {
  id: 0,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTitleSentiment: -5,
  maxTitleSentiment: 5,
  minCommentsSentiment: -5,
  maxCommentsSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

export const positivePostsPreset: PostsFilter = {
  id: 1,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTitleSentiment: -5,
  maxTitleSentiment: 5,
  minCommentsSentiment: -5,
  maxCommentsSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

export const negativePostsPreset: PostsFilter = {
  id: 2,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTitleSentiment: -5,
  maxTitleSentiment: 5,
  minCommentsSentiment: -5,
  maxCommentsSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};
export const PostsFilterContext = createContext<
  [PostsFilter, Dispatch<SetStateAction<PostsFilter>>]
>([defaultPostsPreset, () => {}]);

type Props = {
  children: React.ReactNode;
};

const PostsFilterProvider: FC<Props> = ({ children }) => {
  const [postsFilter, setPostsFilter] =
    useState<PostsFilter>(defaultPostsPreset);

  return (
    <PostsFilterContext.Provider value={[postsFilter, setPostsFilter]}>
      {children}
    </PostsFilterContext.Provider>
  );
};

export default PostsFilterProvider;
