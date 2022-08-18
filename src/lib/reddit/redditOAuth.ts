import axios from "axios";
import { v4 } from "uuid";

// shared
const REDDIT_APP_CLIENT_ID = "pTfDpR15XMxo5d5aNMhT5w";
const ACCESS_TOKEN_RETRIEVAL_URL = "https://www.reddit.com/api/v1/access_token";

// user-specific oauth
const USER_REDIRECT_URI = "http://localhost:3000/authorize-callback";
const USER_REQUEST_URL = "https://www.reddit.com/api/v1/authorize";
const USER_REQUEST_URL_COMPACT =
  "https://www.reddit.com/api/v1/authorize.compact";
const USER_RESPONSE_TYPE = "code";
const USER_TOKEN_DURATION = "permanent";
const USER_SCOPE = "read identity";
const USER_GRANT_TYPE = "authorization_code";
const USER_REFRESH_GRANT_TYPE = "refresh_token";

// application-only oauth
const APP_GRANT_TYPE = "client_credentials";

export const getAuthRequestUrl = (isCompact = false) => {
  const url = new URL(isCompact ? USER_REQUEST_URL_COMPACT : USER_REQUEST_URL);
  const state = v4();
  url.searchParams.append("client_id", REDDIT_APP_CLIENT_ID);
  url.searchParams.append("response_type", USER_RESPONSE_TYPE);
  url.searchParams.append("state", state);
  url.searchParams.append("redirect_uri", USER_REDIRECT_URI);
  url.searchParams.append("duration", USER_TOKEN_DURATION);
  url.searchParams.append("scope", USER_SCOPE);
  return { url, state };
};

const getAccessToken = async (params: URLSearchParams) => {
  const response = await axios.post(
    ACCESS_TOKEN_RETRIEVAL_URL,
    params.toString(),
    {
      headers: {
        "User-Agent": "Doom Scroll",
        Authorization: `Basic ${Buffer.from(
          `${REDDIT_APP_CLIENT_ID}:${process.env["REDDIT_APP_SECRET"]}`
        ).toString("base64")}`,
      },
    }
  );
  return response;
};

export const getUserAccessToken = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: USER_GRANT_TYPE,
    code: code,
    redirect_uri: USER_REDIRECT_URI,
  });
  return await getAccessToken(params);
};

export const getAppAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: APP_GRANT_TYPE,
  });
  return await getAccessToken(params);
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const params = new URLSearchParams({
    grant_type: USER_REFRESH_GRANT_TYPE,
    refresh_token: refreshToken,
  });
  return await getAccessToken(params);
};
