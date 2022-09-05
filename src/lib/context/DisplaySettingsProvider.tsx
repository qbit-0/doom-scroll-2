import { useBoolean } from "@chakra-ui/react";
import { FC, createContext } from "react";

export const DisplaySettingsContext = createContext<{
  hideFilteredContent: boolean;
  setHideFilteredContent: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}>({} as any);

type Props = {
  children: React.ReactNode;
};

const DisplaySettingsProvider: FC<Props> = ({ children }) => {
  const [hideFilteredContent, setHideFilteredContent] = useBoolean(false);

  return (
    <DisplaySettingsContext.Provider
      value={{ hideFilteredContent, setHideFilteredContent }}
    >
      {children}
    </DisplaySettingsContext.Provider>
  );
};

export default DisplaySettingsProvider;
