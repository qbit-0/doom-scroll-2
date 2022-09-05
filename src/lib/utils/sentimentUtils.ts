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
  const titleSentimentInput =
    (textSentiment + textSentimentOffset) * textSentimentWeight;
  return Math.tanh(
    upvoteRatioInput + titleSentimentInput + aggPostSentimentOffset
  );
};

export const getAggCommentSentiment = (
  score: number,
  commentSentiment: number
) => {};
