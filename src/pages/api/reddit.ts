import { redditApi } from "../../lib/reddit/redditServerApi";
import { withSessionRoute } from "../../lib/session/withSession";

const redditRoute = withSessionRoute(async (req, res) => {
  switch (req.method) {
    case "POST":
      const redditResponse = await redditApi(req, req.body);
      res.json(redditResponse.data);
  }
});

export default redditRoute;
