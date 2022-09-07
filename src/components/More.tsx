import { Box, BoxProps, Button } from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { FC, MouseEventHandler, useContext, useState } from "react";
import useSWR, { mutate } from "swr";

import { SubredditContext } from "../lib/context/SubredditProvider";
import { RedditComment, RedditMore } from "../lib/reddit/redditDataStructs";
import Card from "./Card";

type Props = {
  article: string;
  more: RedditMore;
  updateReplies: (replies: (RedditComment | RedditMore)[]) => void;
} & BoxProps;

const More: FC<Props> = ({ more, updateReplies, article, ...innerProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { subreddit } = useContext(SubredditContext);

  const params = {
    method: "POST",
    path: "/api/morechildren",
    query: {
      api_type: "json",
      id: more.data.id,
      link_id: `t3_${article}`,
    },
    data: new URLSearchParams({
      children: more.data.children.join(","),
    }).toString(),
  };
  const { data: moreChildren } = useSWR(params);

  const handleClickMore: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true);
    if (moreChildren) {
      updateReplies(moreChildren["json"]["data"]["things"]);
    } else {
      const response = await axios.post("/api/reddit", {
        method: params.method,
        path: params.path,
        query: params.query,
        data: params.data,
      });
      mutate(params, response.data);
      updateReplies(response.data["json"]["data"]["things"]);
    }
  };

  return (
    <Card p="1" {...innerProps}>
      {more.data.count > 0 ? (
        <Button isLoading={isLoading} onClick={handleClickMore}>{`${
          more.data.count
        } more ${more.data.count > 1 ? "replies" : "reply"}`}</Button>
      ) : (
        <NextLink
          href={`/r/${subreddit}/comments/${article}/comment/${more.data.parent_id.slice(
            3,
            more.data.parent_id.length
          )}`}
        >
          <Button>Continue Thread</Button>
        </NextLink>
      )}
    </Card>
  );
};

export default More;
