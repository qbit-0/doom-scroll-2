import { NextApiHandler } from "next";
import { withSessionRoute } from "../../lib/session/withSession";

const logoutRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      req.session.user = undefined;
      await req.session.save();
      res.send({ ok: true });
  }
};

export default withSessionRoute(logoutRoute);
