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
  minCommentSentiment: number;
  maxCommentSentiment: number;
  minAggregateSentiment: number;
  maxAggregateSentiment: number;
  upvoteRatioWeight: number;
  titleSentimentWeight: number;
  commentsSentimentWeight: number;
};

export const defaultCommentsPreset: CommentsFilter = {
  id: 0,
  minCommentScore: -1,
  maxCommentScore: 1,
  minCommentSentiment: -5,
  maxCommentSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

export const positiveCommentsPreset: CommentsFilter = {
  id: 1,
  minCommentScore: -1,
  maxCommentScore: 1,
  minCommentSentiment: -5,
  maxCommentSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

export const negativeCommentsPreset: CommentsFilter = {
  id: 2,
  minCommentScore: -1,
  maxCommentScore: 1,
  minCommentSentiment: -5,
  maxCommentSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};
export const CommentsFilterContext = createContext<
  [CommentsFilter, Dispatch<SetStateAction<CommentsFilter>>]
>([defaultCommentsPreset, () => {}]);

type Props = {
  children: React.ReactNode;
};

const CommentsFilterProvider: FC<Props> = ({ children }) => {
  const [commentsFilter, setCommentsFilter] = useState<CommentsFilter>(
    defaultCommentsPreset
  );

  return (
    <CommentsFilterContext.Provider value={[commentsFilter, setCommentsFilter]}>
      {children}
    </CommentsFilterContext.Provider>
  );
};

export default CommentsFilterProvider;
