import { useBoolean } from "@chakra-ui/react";
import { FC, createContext } from "react";

interface DisplaySettingsContextInterface {
  hideFilteredContent: boolean;
  setHideFilteredContent: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}

export const DisplaySettingsContext = createContext(
  {} as DisplaySettingsContextInterface
);

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
