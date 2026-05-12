import { useRef } from "react";

export const useDebounce = () => {
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounce = (callback: () => void, delay = 500) => {
        if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(callback, delay);
    };

    return { debounce };
};


export const removeEmptyFields = (
    obj: Record<string, string | number>
    ) => {
    return Object.fromEntries(
        Object.entries(obj).filter(
        ([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
        )
    );
};