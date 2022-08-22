import { ChangeEvent, Dispatch, SetStateAction } from "react";

const setValue = (setter: Dispatch<SetStateAction<any>>) => {
  return (event: ChangeEvent<any>) => {
    setter(event.currentTarget.value);
  };
};

export default setValue;
