import axios from "axios";

export const getNlp = async (text: string) => {
  const nlpResponse = await axios.post("/api/nlp", { text });
  return nlpResponse;
};
