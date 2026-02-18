function TypeBadge({ type }: { type: string }) {

    const colors: Record<string, string> = {
        COURSE: "bg-blue-100 text-blue-700",
        ANNUAL: "bg-purple-100 text-purple-700",
        EXAM: "bg-yellow-100 text-yellow-700",
        CENTER: "bg-indigo-100 text-indigo-700",
        OTHER: "bg-gray-200 text-gray-700",
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${colors[type]}`}>
        {type}
        </span>
    );
}
export default TypeBadge;