import useSWR, { mutate } from "swr";

const useLocalStorage = (key: string) => {
  const { data } = useSWR(key, (key: string) => {
    const value = localStorage.getItem(key);
    return !!value ? JSON.parse(value) : null;
  });

  const setData = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    mutate(key, value);
  };

  return [data, setData];
};

export default useLocalStorage;
