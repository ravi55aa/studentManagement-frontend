function StatusBadge({ status }: { status: string }) {

    const color =
        status === "ACTIVE"
        ? "bg-green-100 text-green-700"
        : "bg-gray-200 text-gray-700";

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
        {status}
        </span>
    );
}
export default StatusBadge;