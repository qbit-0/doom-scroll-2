import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

import { RedditAccount } from "../reddit/redditDataStructs";

export const sessionOptions: IronSessionOptions = {
  cookieName: "doom_scroll_session_cookie",
  password: process.env["IRON_SESSION_PASSWORD"] as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export type SessionAppData = {
  appAccessToken?: {
    appAccessToken: string;
    appAccessTokenExpirationTime: number;
  };
};

export type SessionUserData = {
  userAccessToken?: {
    userAccessToken: string;
    userAccessTokenExpirationTime: number;
  };
  userRefreshToken: string;
  me?: RedditAccount;
};

declare module "iron-session" {
  interface IronSessionData {
    app?: SessionAppData;
    user?: SessionUserData;
  }
}

export const withSessionApiRoute = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, sessionOptions);
};

export const withSessionSsr = <
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => {
  return withIronSessionSsr(handler, sessionOptions);
};
