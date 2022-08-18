import { NextApiHandler } from "next";

import { withSessionRoute } from "../../lib/session/withSession";

const loginRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      res.send(req.session.user?.me);
      break;
  }
};

export default withSessionRoute(loginRoute);
