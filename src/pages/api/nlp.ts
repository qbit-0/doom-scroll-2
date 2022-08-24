import model from "wink-eng-lite-model";
import winkNLP from "wink-nlp";

import { withSessionRoute } from "../../lib/session/withSession";

const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);

export type analysis = {
  sentiment: number;
};

const redditRoute = withSessionRoute(async (req, res) => {
  switch (req.method) {
    case "POST":
      const text = req.body.text;
      const sentiment = Number(nlp.readDoc(text).out(nlp.its.sentiment));

      res.json({
        sentiment,
      });
  }
});

export default redditRoute;
