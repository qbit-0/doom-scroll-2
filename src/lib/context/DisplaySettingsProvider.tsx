import { createContext, FC } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

interface DisplaySettingsContextInterface {
  showFilteredContent: boolean;
  setShowFilteredPosts: (value: boolean) => void;
  showAdvancedSettings: boolean;
  setShowAdvancedSettings: (value: boolean) => void;
}

export const DisplaySettingsContext = createContext(
  {} as DisplaySettingsContextInterface
);

type Props = {
  children: React.ReactNode;
};

const DisplaySettingsProvider: FC<Props> = ({ children }) => {
  const [showFilteredPosts, setShowFilteredPosts] = useLocalStorage<boolean>(
    "showFilteredContent"
  );
  const [showAdvancedSettings, setShowAdvancedSettings] =
    useLocalStorage<boolean>("showAdvancedSettings");

  return (
    <DisplaySettingsContext.Provider
      value={{
        showFilteredContent:
          showFilteredPosts === undefined || showFilteredPosts === null
            ? true
            : showFilteredPosts,
        setShowFilteredPosts,
        showAdvancedSettings:
          showAdvancedSettings === undefined || showFilteredPosts === null
            ? false
            : showAdvancedSettings,
        setShowAdvancedSettings,
      }}
    >
      {children}
    </DisplaySettingsContext.Provider>
  );
};

export default DisplaySettingsProvider;
