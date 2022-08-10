import { NextApiHandler } from "next";

import { withSessionRoute } from "../../lib/session/withSession";

const loginRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      req.session.user = {
        username: req.body.username,
        userAccessToken: req.body.userAccessToken,
        userRefreshToken: req.body.userRefreshToken,
      };
      await req.session.save();
      res.send({ ok: true });
      break;
  }
};

export default withSessionRoute(loginRoute);
