import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type CommentsFilter = {
  id: number | null;
  minCommentScore: number;
  maxCommentScore: number;
  minTextSentiment: number;
  maxTextSentiment: number;
  minAggSentiment: number;
  maxAggSentiment: number;
};

export const defaultCommentsPreset: CommentsFilter = {
  id: 0,
  minCommentScore: -1,
  maxCommentScore: 1,
  minTextSentiment: -1,
  maxTextSentiment: 1,
  minAggSentiment: -1,
  maxAggSentiment: 1,
};

export const positiveCommentsPreset: CommentsFilter = {
  id: 1,
  minCommentScore: 0,
  maxCommentScore: 1,
  minTextSentiment: -1,
  maxTextSentiment: 1,
  minAggSentiment: 0,
  maxAggSentiment: 1,
};

export const negativeCommentsPreset: CommentsFilter = {
  id: 2,
  minCommentScore: -1,
  maxCommentScore: 0,
  minTextSentiment: -1,
  maxTextSentiment: 1,
  minAggSentiment: -1,
  maxAggSentiment: 0,
};
export const CommentsFilterContext = createContext<{
  commentsFilter: CommentsFilter;
  setCommentsFilter: Dispatch<SetStateAction<CommentsFilter>>;
}>({} as any);

type Props = {
  children: React.ReactNode;
};

const CommentsFilterProvider: FC<Props> = ({ children }) => {
  const [commentsFilter, setCommentsFilter] = useState<CommentsFilter>(
    defaultCommentsPreset
  );

  return (
    <CommentsFilterContext.Provider
      value={{ commentsFilter, setCommentsFilter }}
    >
      {children}
    </CommentsFilterContext.Provider>
  );
};

export default CommentsFilterProvider;
