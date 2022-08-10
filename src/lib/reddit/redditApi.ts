import axios from "axios";
import { log } from "console";
import { useScroll } from "framer-motion";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";

import { SessionUserData } from "../session/withSession";
import { getAppAccessToken, refreshUserAccessToken } from "./redditOAuth";

const REDDIT_API_BASE_URL = "https://oauth.reddit.com";

export const getAccessToken = async (req: NextApiRequest | IncomingMessage) => {
  const appAccessTokenExpirationTime =
    req.session.app?.appAccessToken?.appAccessTokenExpirationTime;

  if (
    appAccessTokenExpirationTime &&
    Date.now().valueOf() > appAccessTokenExpirationTime
  ) {
    req.session.app = undefined;
    await req.session.save();
  }

  const userAccessTokenExpirationTime =
    req.session.user?.userAccessToken?.userAccessTokenExpirationTime;
  if (
    userAccessTokenExpirationTime &&
    Date.now().valueOf() > userAccessTokenExpirationTime
  ) {
    req.session.user = {
      ...(req.session.user as SessionUserData),
      userAccessToken: undefined,
    };
    await req.session.save();
  }

  const appAccessToken = req.session.app?.appAccessToken?.appAccessToken;
  const userAccessToken = req.session.user?.userAccessToken?.userAccessToken;
  const userRefreshToken = req.session.user?.userRefreshToken;

  let accessToken;
  if (userAccessToken) {
    accessToken = userAccessToken;
  } else if (userRefreshToken) {
    const userAccessTokenResponse = await refreshUserAccessToken(
      userRefreshToken
    );
    const newUserAccessToken = userAccessTokenResponse.data["access_token"];
    const expiresIn = userAccessTokenResponse.data["expires_in"];

    req.session.user = {
      ...(req.session.user as SessionUserData),
      userAccessToken: {
        userAccessToken: newUserAccessToken,
        userAccessTokenExpirationTime: Date.now().valueOf() + expiresIn,
      },
    };
    await req.session.save();
    accessToken = newUserAccessToken;
  } else if (appAccessToken) {
    accessToken = appAccessToken;
  } else {
    const appAccessTokenResponse = await getAppAccessToken();
    const newAppAccessToken = appAccessTokenResponse.data["access_token"];
    const expiresIn = appAccessTokenResponse.data["expires_in"];
    req.session.app = {
      appAccessToken: {
        appAccessToken: newAppAccessToken,
        appAccessTokenExpirationTime: Date.now().valueOf() + expiresIn,
      },
    };
    await req.session.save();
    accessToken = newAppAccessToken;
  }

  return accessToken;
};

export const redditApi = async (
  req: NextApiRequest | IncomingMessage,
  redditApiParams: {
    method: string;
    path: string;
    query?: Record<string, string>;
    data?: any;
    accessToken?: string;
  }
) => {
  if (!redditApiParams.accessToken) {
    redditApiParams.accessToken = await getAccessToken(req);
  }

  const url = new URL(`${REDDIT_API_BASE_URL}${redditApiParams.path}`);
  if (redditApiParams.query) {
    Object.entries(redditApiParams.query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  url.searchParams.append("raw_json", "1");

  const redditResponse = await axios({
    method: redditApiParams.method,
    url: url.href,
    data: redditApiParams.data,
    headers: {
      Authorization: `bearer ${redditApiParams.accessToken}`,
    },
  });

  return redditResponse;
};
