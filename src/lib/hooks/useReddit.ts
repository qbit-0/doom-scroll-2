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
  return useSWR<T>(params, async () => {
    if (!params) return null;
    const response = await axios.post("/api/reddit", {
      method: params.method,
      path: params.path,
      query: params.query,
      data: params.data,
    });

    return response.data;
  });
};

export default useReddit;
