import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAccessToken } from "../utils/api/reddit/redditOAuth";

const AuthorizeCallbackPage = () => {
  const router = useRouter();
  const error = router.query.error as string;
  const code = router.query.code as string;
  const state = router.query.state as string;

  useEffect(() => {
    if (code === undefined) return;

    const logAccessToken = async () => {
      const response = await getAccessToken(code);
      console.log(response.data);
    };

    logAccessToken();

    return;
  }, [code]);

  if (error) {
    return <Box>error: {error}</Box>;
  }

  return (
    <Box>
      state: {state}
      <br />
      code: {code}
    </Box>
  );
};

export default AuthorizeCallbackPage;
