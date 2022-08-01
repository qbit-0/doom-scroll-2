import { GetServerSidePropsContext } from "next";
import {
  getAppAccessToken,
  refreshUserAccessToken,
} from "../reddit/redditOAuth";
import { SessionUserData } from "./withSession";

const getSessionAccessToken = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const appAccessToken = req.session.app?.appAccessToken;
  const userAccessToken = req.session.user?.userAccessToken;
  const userRefreshToken = req.session.user?.userRefreshToken;

  let accessToken;
  if (userAccessToken) {
    accessToken = userAccessToken;
  } else if (userRefreshToken) {
    const userAccessTokenResponse = await refreshUserAccessToken(
      userRefreshToken
    );
    const newUserAccessToken = userAccessTokenResponse.data["accessToken"];

    req.session.user = {
      ...(req.session.user as SessionUserData),
      userAccessToken: newUserAccessToken,
    };
    await req.session.save();
  } else if (appAccessToken) {
    accessToken = appAccessToken;
  } else {
    const appAccessTokenResponse = await getAppAccessToken();
    const newAppAccessToken = appAccessTokenResponse.data["access_token"];
    req.session.app = {
      appAccessToken: newAppAccessToken,
    };
    await req.session.save();
    accessToken = newAppAccessToken;
  }

  return accessToken;
};

export default getSessionAccessToken;
