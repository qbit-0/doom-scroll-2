import { GetServerSidePropsContext, NextApiRequest } from "next";
import {
  getAppAccessToken,
  refreshUserAccessToken,
} from "../reddit/redditOAuth";
import { SessionUserData } from "./withSession";

const getSessionAccessToken = async (req: NextApiRequest) => {
  const appAccessToken = req.session.app?.appAccessToken;
  const userAccessToken = req.session.user?.userAccessToken;
  const userRefreshToken = req.session.user?.userRefreshToken;
  const userAccessTokenExpirationTime =
    req.session.user?.userAccessTokenExpirationTime;

  let accessToken;
  if (
    userAccessToken &&
    userAccessTokenExpirationTime &&
    Date.now().valueOf() < userAccessTokenExpirationTime
  ) {
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
