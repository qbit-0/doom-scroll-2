import { NextApiHandler } from "next";

import { withSessionApiRoute } from "../../lib/session/withSession";

const logoutRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      req.session.user = undefined;
      await req.session.save();
      res.send({ ok: true });
      break;
  }
};

export default withSessionApiRoute(logoutRoute);
