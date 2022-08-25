import axios from "axios";
import useSWR from "swr";

import { Analysis } from "../../pages/api/nlp";

const useNlp = (text: string | undefined | null) => {
  return useSWR({ type: "nlp", text }, async ({ text }: { text: string }) => {
    if (text === undefined || text === null) return null;
    const response = await axios.post("/api/nlp", {
      text,
    });
    return response.data as Analysis;
  });
};

export default useNlp;
