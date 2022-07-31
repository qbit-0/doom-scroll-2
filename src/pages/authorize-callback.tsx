import { Box } from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useMeContext } from "../utils/context/MeContext";
import { getReddit } from "../utils/reddit/redditApi";
import { getUserAccessToken } from "../utils/reddit/redditOAuth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const error = context.query["error"] as string;
  const code = context.query["code"] as string;
  const state = context.query["state"] as string;

  const accessTokenResponse = await getUserAccessToken(code);
  const userAccessToken = accessTokenResponse.data["access_token"];
  const userRefreshToken = accessTokenResponse.data["refresh_token"];
  const expiresIn = accessTokenResponse.data["expires_in"];

  setCookie("user_access_token", userAccessToken, {
    req: context.req,
    res: context.res,
    maxAge: expiresIn,
    httpOnly: true,
  });
  setCookie("user_refresh_token", userRefreshToken, {
    req: context.req,
    res: context.res,
    maxAge: expiresIn,
    httpOnly: true,
  });

  const meResponse = await getReddit("/api/v1/me", userAccessToken);
  const me = meResponse.data;

  return {
    props: { me },
  };
};

type Props = {
  me: Record<string, any>;
};

const AuthorizeCallbackPage: FC<Props> = ({ me }) => {
  const meContext = useMeContext();

  const router = useRouter();
  useEffect(() => {
    meContext.setMe(me);
    router.replace("/");
  }, [me, meContext, router]);

  return <Box>Logged In, Redirecting to Home</Box>;
};

export default AuthorizeCallbackPage;
