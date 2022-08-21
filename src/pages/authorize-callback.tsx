import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { mutate } from "swr";

import PageFrame from "../components/PageFrame";
import { getUserAccessToken } from "../lib/reddit/redditOAuth";
import { redditApi } from "../lib/reddit/redditServerApi";
import { withSessionSsr } from "../lib/session/withSession";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;
    // const error = context.query["error"] as string;
    const code = context.query["code"] as string;
    // const state = context.query["state"] as string;

    const accessTokenResponse = await getUserAccessToken(code);
    const userAccessToken = accessTokenResponse.data["access_token"];
    const userRefreshToken = accessTokenResponse.data["refresh_token"];
    const expiresIn = accessTokenResponse.data["expires_in"];

    const meResponse = await redditApi(req, {
      method: "GET",
      path: "/api/v1/me",
      accessToken: userAccessToken,
    });
    const me = meResponse.data;

    req.session.user = {
      userAccessToken: {
        userAccessToken,
        userAccessTokenExpirationTime: Date.now().valueOf() + expiresIn,
      },
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
    localStorage.setItem("me", JSON.stringify(me));
    mutate("me");
    router.replace("/");
  }, [me, router]);

  return <PageFrame />;
};

export default AuthorizeCallbackPage;
