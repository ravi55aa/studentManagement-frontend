import React from "react";

export const useAppHandleInputChange = <T extends Record<string, unknown>>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setFormData: React.Dispatch<React.SetStateAction<T>>
    ) => {
    const { name, value, type } = e.target;

    // Clear error message safely
    const spanTag = document.getElementById(name);
    if (spanTag) spanTag.textContent = "";

    // Handle file input
    if (type === "file") {
        const files = (e.target as HTMLInputElement).files;
        if (!files || files.length === 0) return;

        setFormData((prev) => ({
        ...prev,
        [name]: files[0],
        }));
        return;
    }

    // Handle normal inputs
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
    };
