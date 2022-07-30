import axios from "axios";
import { v4 } from "uuid";

const OAUTH_REQUEST_URL_ENDPOINT = "https://www.reddit.com/api/v1/authorize";
const OAUTH_REQUEST_URL_ENDPOINT_COMPACT =
  "https://www.reddit.com/api/v1/authorize.compact";
const OAUTH_CLIENT_ID = "pTfDpR15XMxo5d5aNMhT5w";
const OAUTH_RESPONSE_TYPE = "code";
const OAUTH_REDIRECT_URI = "http://localhost:3000/authorize-callback";
const OAUTH_TOKEN_DURATION = "permanent";
const OAUTH_SCOPE = "read";

const OAUTH_ACCESS_TOKEN_URL_ENDPOINT =
  "https://www.reddit.com/api/v1/access_token";
const OAUTH_GRANT_TYPE = "authorization_code";

export const generateAuthRequestUrl = (isCompact: boolean) => {
  const url = new URL(
    isCompact ? OAUTH_REQUEST_URL_ENDPOINT_COMPACT : OAUTH_REQUEST_URL_ENDPOINT
  );
  url.searchParams.append("client_id", OAUTH_CLIENT_ID);
  url.searchParams.append("response_type", OAUTH_RESPONSE_TYPE);
  url.searchParams.append("state", v4());
  url.searchParams.append("redirect_uri", OAUTH_REDIRECT_URI);
  url.searchParams.append("duration", OAUTH_TOKEN_DURATION);
  url.searchParams.append("scope", OAUTH_SCOPE);
  return url;
};

export const getAccessToken = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: OAUTH_GRANT_TYPE,
    code: code,
    redirect_uri: OAUTH_REDIRECT_URI,
  });

  return await axios.post(OAUTH_ACCESS_TOKEN_URL_ENDPOINT, params.toString(), {
    headers: {
      "User-Agent": "Doom Scroll",
      Authorization: `Basic ${window.btoa(
        `${OAUTH_CLIENT_ID}:process.env.REDDIT_APP_SECRET`
      )}`,
    },
  });
};
