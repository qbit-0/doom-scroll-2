import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MeContextInterface {
  me: Record<string, any> | null;
  setMe: Dispatch<SetStateAction<any | null>>;
}

const MeContext = createContext<MeContextInterface>({} as MeContextInterface);

type Props = {
  children: React.ReactNode;
};

const MeProvider: FC<Props> = ({ children }) => {
  const [me, setMe] = useState<Record<string, any> | null>(null);
  return (
    <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
  );
};

export const useMeContext = () => {
  return useContext(MeContext);
};

export default MeProvider;
