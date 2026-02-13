import React from "react";

type CheckListItem = {
    code: string;
    name?: string;
    year?: string;
};

type CheckListProps<T extends CheckListItem> = {
    label: string;
    items: T[];
    type?: "radio" | "checkbox";
    name?: string;

    // selected value(s)
    selected?: string | string[] | null;

    // what property to display
    displayKey: keyof T;

    onChange: (value: string) => void;
};

export default function CheckList<T extends CheckListItem>({
    label,
    items,
    type = "radio",
    name,
    selected,
    displayKey,
    onChange,
    }: CheckListProps<T>) {
    const isChecked = (code: string) => {
        if (type === "radio") {
        return selected === code;
        }

        if (type === "checkbox" && Array.isArray(selected)) {
        return selected.includes(code);
        }

        return false;
    };

    return (
        <div>
        <p className="text-sm font-medium mb-2">{label}</p>

        <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
            {items.length <= 0 ? (
            <input
                readOnly
                type="text"
                placeholder="No Data Available"
                className="text-sm text-gray-500 bg-transparent"
            />
            ) : (
            items.map((item) => (
                <label
                key={item.code}
                className="flex items-center gap-3 text-sm cursor-pointer"
                >
                <input
                    type={type}
                    name={name}
                    value={item.code}
                    checked={isChecked(item.code)}
                    onChange={() => onChange(item.code)}
                    className="accent-green-700"
                />

                <span>
                    {String(item[displayKey])}
                    <span className="text-gray-500 ml-1">
                    ({item.code})
                    </span>
                </span>
                </label>
            ))
            )}
        </div>
        </div>
    );
}
