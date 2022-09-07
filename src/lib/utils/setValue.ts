import { ChangeEvent, Dispatch, SetStateAction } from "react";

const setValue = (
  setter: Dispatch<SetStateAction<any>>,
  callback?: () => void
) => {
  return (event: ChangeEvent<any>) => {
    setter(event.currentTarget.value);
    if (callback) callback();
  };
};

export default setValue;
