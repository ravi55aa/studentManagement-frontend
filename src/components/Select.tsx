

export default function Select({
    label,
    options,
    ...props
    }: {
    label: string;
    options: { label: string; value: string }[] | string[];
    } & React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div>
        <label className="block text-sm font-medium mb-1">
            {label}
        </label>
        <select
            {...props}
            className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
        >
            <option value="">Select</option>
            {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
            ))}
        </select>
        <span id={props.name} className="text-red-500 text-sm errorDisplay"></span>
        </div>
    );
}
