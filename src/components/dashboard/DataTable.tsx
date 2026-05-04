interface Column {
    key: string;
    label: string;
}

interface Props {
    columns: Column[];
    data: any[];
}

const DataTable = ({ columns, data }: Props) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
        <table className="w-full text-sm">
            <thead className="bg-green-50 text-gray-700">
            <tr>
                {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                    {col.label}
                </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {data.length > 0 ? (
                data.map((row, i) => (
                <tr key={i} className="border-t hover:bg-green-50">
                    {columns.map((col) => (
                    <td key={col.key} className="p-3">
                        {row[col.key]}
                    </td>
                    ))}
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-400">
                    No data available
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export default DataTable;