import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Me = Record<string, any>;
interface MeContextInterface {
  me: Record<string, any> | null;
  setMe: Dispatch<SetStateAction<Me | null>>;
}

const MeContext = createContext<MeContextInterface>(null as any);

type Props = {
  children: React.ReactNode;
};

const MeProvider: FC<Props> = ({ children }) => {
  const [me, setMe] = useState<Me | null>(null);
  return (
    <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
  );
};

export const useMeContext = () => {
  return useContext(MeContext);
};

export default MeProvider;
