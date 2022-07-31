import axios from "axios";

const REDDIT_API_BASE_URL = "https://oauth.reddit.com";

export const getReddit = async (path: string, accessToken: string) => {
  return await axios.get(`${REDDIT_API_BASE_URL}${path}`, {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
};
