import { getCookie, setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { getReddit } from "../utils/reddit/redditApi";
import {
  getAppAccessToken,
  refreshUserAccessToken,
} from "../utils/reddit/redditOAuth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAccessToken = getCookie("user_access_token", context) as string;
  const userRefreshToken = getCookie("user_refresh_token", context) as string;
  const appAccessToken = getCookie("app_access_token", context) as string;

  let accessToken;
  if (userAccessToken) {
    accessToken = userAccessToken;
  } else if (userRefreshToken) {
    const userAccessTokenResponse = await refreshUserAccessToken(
      userRefreshToken
    );
    const newUserAccessToken = userAccessTokenResponse.data["accessToken"];
    const expiresIn = userAccessTokenResponse.data["expires_in"];
    setCookie("user_access_token", newUserAccessToken, {
      req: context.req,
      res: context.res,
      maxAge: expiresIn,
      httpOnly: true,
    });
  } else if (appAccessToken) {
    accessToken = appAccessToken;
  } else {
    const appAccessTokenResponse = await getAppAccessToken();
    const newAppAccessToken = appAccessTokenResponse.data["access_token"];
    const expiresIn = appAccessTokenResponse.data["expires_in"];
    setCookie("app_access_token", newAppAccessToken, {
      req: context.req,
      res: context.res,
      maxAge: expiresIn,
      httpOnly: true,
    });
    accessToken = appAccessTokenResponse.data["access_token"];
  }

  const postsResponse = await getReddit("/r/all", accessToken);

  return {
    props: {
      posts: JSON.stringify(postsResponse.data),
    },
  };
};

type Props = {};

const Home = ({ posts }) => {
  return <Layout>{posts}</Layout>;
};

export default Home;
