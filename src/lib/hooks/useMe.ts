import useSWR from "swr";

const useMe = () => {
    const { data, error } = useSWR("me", (key) => {
        const value = localStorage.getItem(key);
        return !!value ? JSON.parse(value) : undefined;
    });

    return {
        me: data,
        isLoading: !error && !data,
        error: error,
    };
};

export default useMe;
