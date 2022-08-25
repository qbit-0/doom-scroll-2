import { RedditComment, RedditListing, RedditMore } from "./redditDataStructs";

const getRedditCommentsText = (
  comments: RedditListing<RedditComment | RedditMore>
): string => {
  return comments.data.children
    .map((comment) => {
      if (comment.kind === "t1") return getRedditCommentText(comment);
      return "";
    })
    .join("\n");
};

const getRedditCommentText = (comment: RedditComment): string => {
  const commentBody = comment.data.body;
  const repliesBody = comment.data.replies
    ? getRedditCommentsText(comment.data.replies)
    : "";
  return commentBody + "\n" + repliesBody;
};

export default getRedditCommentsText;
