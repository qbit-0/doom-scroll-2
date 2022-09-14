import Sentiment from "sentiment";

import { CommentsFilter } from "../context/CommentsFilterProvider";
import { PostsFilter } from "../context/PostsFilterProvider";
import { RedditComment, RedditLink } from "../reddit/redditDataStructs";

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
const postTextSentimentWeight = 0.25;
const posttextSentimentOffset = 0;
const aggPostSentimentOffset = 0;

export const getAggPostSentiment = (
  upvoteRatio: number,
  textSentiment: number
) => {
  const upvoteRatioInput =
    (upvoteRatio + postUpvoteRatioOffset) * postUpvoteRatioWeight;
  const textSentimentInput =
    (textSentiment + posttextSentimentOffset) * postTextSentimentWeight;
  return Math.tanh(
    upvoteRatioInput + textSentimentInput + aggPostSentimentOffset
  );
};

export const isCommentFiltered = (
  commentsFilter: CommentsFilter,
  comment: RedditComment,
  textSentiment: Sentiment.AnalysisResult,
  aggSentiment: number
) => {
  return (
    (commentsFilter.minScore !== null &&
      comment.data.score < commentsFilter.minScore) ||
    (commentsFilter.maxScore !== null &&
      comment.data.score > commentsFilter.maxScore) ||
    textSentiment.comparative < commentsFilter.minTextSentiment ||
    textSentiment.comparative > commentsFilter.maxTextSentiment ||
    aggSentiment < commentsFilter.minAggSentiment ||
    aggSentiment > commentsFilter.maxAggSentiment
  );
};

const commentTextSentimentWeight = 0.25;
const commentTextSentimentOffset = 0;
const aggCommentSentimentOffset = 0;

export const getAggCommentSentiment = (textSentiment: number) => {
  const textSentimentInput =
    (textSentiment + commentTextSentimentOffset) * commentTextSentimentWeight;
  return Math.tanh(textSentimentInput + aggCommentSentimentOffset);
};
