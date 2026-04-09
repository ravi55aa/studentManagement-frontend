function StatusBadge({ status }: { status: string }) {
  const color = status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700';


  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    verified: 'bg-green-100 text-green-800',
    repeat: 'bg-red-100 text-red-800',
    submitted: 'bg-blue-100 text-blue-800',
    ACTIVE : "bg-green-100 text-green-700",
    reviewed:"bg-gray-200 text-gray-700",
  };

  return <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status]} ${color}`}>{status}</span>;
}

export default StatusBadge;