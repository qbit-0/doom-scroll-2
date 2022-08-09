export const genCommentTrees = (comments: any) => {
  const commentsTrees: any[] = [];

  comments.forEach((comment: any) => {
    commentsTrees.push(comment);
  });

  return commentsTrees;
};
