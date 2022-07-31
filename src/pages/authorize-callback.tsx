import { Box } from "@chakra-ui/react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { getUserAccessToken } from "../utils/reddit/redditOAuth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const error = context.query["error"] as string;
  const code = context.query["code"] as string;
  const state = context.query["state"] as string;

  const response = await getUserAccessToken(code);
  const userAccessToken = response.data["access_token"];
  const userRefreshToken = response.data["refresh_token"];
  const expiresIn = response.data["expires_in"];

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

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};

const AuthorizeCallbackPage = () => {
  return <Box>Redirecting to Home</Box>;
};

export default AuthorizeCallbackPage;
