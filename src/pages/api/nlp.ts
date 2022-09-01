import { NextApiHandler } from "next";
import model from "wink-eng-lite-model";
import winkNLP from "wink-nlp";

import { withSessionApiRoute } from "../../lib/session/withSession";

const nlp = winkNLP(model, ["sbd", "negation", "sentiment"]);

export type Analysis = {
  sentiment: number;
};

const nlpRoute: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const text = req.body.text;
      const sentiment = Number(nlp.readDoc(text).out(nlp.its.sentiment));

      res.json({
        sentiment,
      });
  }
};

export default withSessionApiRoute(nlpRoute);
