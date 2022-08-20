import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import NavBarFrame from "../../../../../components/NavBarFrame";
import PageFrame from "../../../../../components/PageFrame";
import PostAndComments from "../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../components/SubredditRules";

type Props = {};

const CommentsPage: FC<Props> = ({}) => {
  const router = useRouter();
  const [subreddit, setSubreddit] = useState<string | null>(null);
  const [article, setArticle] = useState<string | null>(null);

  useEffect(() => {
    if (!subreddit) setSubreddit((router.query["subreddit"] as string) || "");
    if (!article) setArticle((router.query["article"] as string) || "");
  }, [router.query, subreddit, article]);

  return (
    <NavBarFrame subreddit={subreddit}>
      <PageFrame
        top={<SubredditBanner showTitle={true} subreddit={subreddit} />}
        left={<PostAndComments article={article} />}
        right={
          <>
            <SubredditAbout subreddit={subreddit} />
            <SubredditRules subreddit={subreddit} />
          </>
        }
      />
    </NavBarFrame>
  );
};

export default CommentsPage;
