import { useEffect, useState } from "react";

import isBrowser from "../utils/isBrowser";

const useIsCompact = (width = 768) => {
  const [isCompact, setIsCompact] = useState(
    isBrowser() && window.innerWidth < width
  );
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(isBrowser() && window.innerWidth < width);
    };

    global.window.addEventListener("resize", handleResize);

    return () => {
      global.window.removeEventListener("resize", handleResize);
    };
  });
  return isCompact;
};

export default useIsCompact;
