import React, { FC, createContext, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export type CommentsFilter = {
  id: number | null;
  minScore: number;
  maxScore: number;
  minTextSentiment: number;
  maxTextSentiment: number;
  minAggSentiment: number;
  maxAggSentiment: number;
};

export const defaultCommentsPreset: CommentsFilter = {
  id: 0,
  minScore: -10000000000,
  maxScore: 10000000000,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: -1,
  maxAggSentiment: 1,
};

export const positiveCommentsPreset: CommentsFilter = {
  id: 1,
  minScore: 10000000000,
  maxScore: 10000000000,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: 0,
  maxAggSentiment: 1,
};

export const negativeCommentsPreset: CommentsFilter = {
  id: 2,
  minScore: -10000000000,
  maxScore: 10000000000,
  minTextSentiment: -5,
  maxTextSentiment: 5,
  minAggSentiment: -1,
  maxAggSentiment: 0,
};

interface CommentsFilterContextInterface {
  commentsFilter: CommentsFilter;
  setCommentsFilter: (commentsFilter: CommentsFilter) => void;
}

export const CommentsFilterContext = createContext(
  {} as CommentsFilterContextInterface
);

type Props = {
  children: React.ReactNode;
};

const CommentsFilterProvider: FC<Props> = ({ children }) => {
  const [commentsFilter, setCommentsFilter] =
    useLocalStorage<CommentsFilter>("commentsFilter");

  return (
    <CommentsFilterContext.Provider
      value={{
        commentsFilter:
          commentsFilter === undefined || commentsFilter === null
            ? defaultCommentsPreset
            : commentsFilter,
        setCommentsFilter,
      }}
    >
      {children}
    </CommentsFilterContext.Provider>
  );
};

export default CommentsFilterProvider;
