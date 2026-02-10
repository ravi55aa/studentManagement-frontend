export type CheckboxListProps<T extends Record<string, unknown>> = {
    label: string;
    name: string;
    items: T[];
    labelKey: keyof T;
    valueKey: keyof T;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
