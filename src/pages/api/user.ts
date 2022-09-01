import { NextApiHandler } from "next";

import { withSessionApiRoute } from "../../lib/session/withSession";

const userRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      res.send(req.session.user);
      break;
  }
};

export default withSessionApiRoute(userRoute);
