import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { RedditMe } from "../reddit/redditDataStructs";

export const MeContext = createContext<{
  me?: RedditMe;
  setMe: Dispatch<SetStateAction<RedditMe | undefined>>;
}>({ me: undefined, setMe: () => {} });

type Props = {
  children: React.ReactNode;
  initialMe?: RedditMe;
};

const MeProvider: FC<Props> = ({ children, initialMe }) => {
  const [me, setMe] = useState<RedditMe | undefined>(initialMe);

  useEffect(() => {
    setMe(initialMe);
  }, [initialMe]);

  return (
    <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
  );
};

export default MeProvider;
