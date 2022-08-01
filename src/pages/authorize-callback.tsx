import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { getReddit } from "../lib/reddit/redditApi";
import { getUserAccessToken } from "../lib/reddit/redditOAuth";
import { withSessionSsr } from "../lib/session/withSession";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req, res } = context;
    // const error = context.query["error"] as string;
    const code = context.query["code"] as string;
    // const state = context.query["state"] as string;

    const accessTokenResponse = await getUserAccessToken(code);
    const userAccessToken = accessTokenResponse.data["access_token"];
    const userRefreshToken = accessTokenResponse.data["refresh_token"];

    const meResponse = await getReddit("/api/v1/me", userAccessToken);
    const me = meResponse.data;

    req.session.user = {
      username: me.name,
      userAccessToken: userAccessToken,
      userRefreshToken: userRefreshToken,
    };
    await req.session.save();

    return {
      props: { me },
    };
  }
);

type Props = {
  me: Record<string, any>;
};

const AuthorizeCallbackPage: FC<Props> = ({ me }) => {
  const router = useRouter();
  useEffect(() => {
    Cookies.set("username", me["name"]);
    router.replace("/");
  }, [me, router]);

  return <Box>Logged In, Redirecting to Home</Box>;
};

export default AuthorizeCallbackPage;
