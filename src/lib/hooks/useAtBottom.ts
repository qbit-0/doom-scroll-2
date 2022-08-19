import { useEffect, useState } from "react";

const useAtBottom = (offset = 0) => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const scrollBottomListener = () => {
      if (
        window.innerHeight + window.pageYOffset + offset >=
        document.body.offsetHeight
      ) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    };
    window.addEventListener("scroll", scrollBottomListener);

    return () => {
      window.removeEventListener("scroll", scrollBottomListener);
    };
  }, []);

  return atBottom;
};

export default useAtBottom;
