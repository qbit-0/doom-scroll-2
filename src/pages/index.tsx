import { Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FC } from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { getReddit } from "../lib/reddit/redditApi";
import getSessionAccessToken from "../lib/session/getSessionAccessToken";
import { withSessionSsr } from "../lib/session/withSession";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    let accessToken = await getSessionAccessToken(context);
    const postsResponse = await getReddit("", accessToken);
    return {
      props: {
        posts: postsResponse.data,
      },
    };
  }
);

type Props = {
  posts: any;
};

const Home: FC<Props> = ({ posts }) => {
  return (
    <Layout>
      {posts.data.children.map((post: any, index: number) => (
        <Post post={post} key={index} />
      ))}
      <Button>more</Button>
    </Layout>
  );
};

export default Home;
