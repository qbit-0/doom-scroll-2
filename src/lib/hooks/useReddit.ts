import axios from "axios";
import useSWR from "swr";

const useReddit = <T>(
  params: {
    method: string;
    path: string;
    query?: Record<string, string>;
    data?: any;
  } | null
) => {
  const { data: redditResponse, error } = useSWR<T>(
    JSON.stringify(params),
    async () => {
      if (!params) return null;
      const response = await axios.post("/api/reddit", {
        method: params.method,
        path: params.path,
        query: params.query,
        body: params.data,
      });
      return response.data;
    }
  );
  return redditResponse;
};

export default useReddit;
