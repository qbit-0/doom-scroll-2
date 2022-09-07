import Sentiment from "sentiment";

import { PostsFilter } from "../context/PostsFilterProvider";
import { RedditLink } from "../reddit/redditDataStructs";

export const isPostFiltered = (
  postsFilter: PostsFilter,
  post: RedditLink,
  textSentiment: Sentiment.AnalysisResult,
  aggSentiment: number
) => {
  return (
    (postsFilter.minScore !== null && post.data.score < postsFilter.minScore) ||
    (postsFilter.maxScore !== null && post.data.score > postsFilter.maxScore) ||
    post.data.upvote_ratio < postsFilter.minUpvoteRatio ||
    post.data.upvote_ratio > postsFilter.maxUpvoteRatio ||
    textSentiment.comparative < postsFilter.minTextSentiment ||
    textSentiment.comparative > postsFilter.maxTextSentiment ||
    aggSentiment < postsFilter.minAggSentiment ||
    aggSentiment > postsFilter.maxAggSentiment
  );
};

const postUpvoteRatioWeight = 0.75;
const postUpvoteRatioOffset = -0.95;
const textSentimentWeight = 0.25;
const textSentimentOffset = 0;
const aggPostSentimentOffset = 0;

export const getAggPostSentiment = (
  upvoteRatio: number,
  textSentiment: number
) => {
  const upvoteRatioInput =
    (upvoteRatio + postUpvoteRatioOffset) * postUpvoteRatioWeight;
  const textSentimentInput =
    (textSentiment + textSentimentOffset) * textSentimentWeight;
  return Math.tanh(
    upvoteRatioInput + textSentimentInput + aggPostSentimentOffset
  );
};

export const getAggCommentSentiment = (
  score: number,
  commentSentiment: number
) => {};
