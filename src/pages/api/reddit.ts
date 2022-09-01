import { NextApiHandler } from "next";

import { requestReddit } from "../../lib/reddit/redditServerApi";
import { withSessionApiRoute } from "../../lib/session/withSession";

const redditRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const redditResponse = await requestReddit(req, req.body);
      res.json(redditResponse.data);
      break;
  }
};

export default withSessionApiRoute(redditRoute);
