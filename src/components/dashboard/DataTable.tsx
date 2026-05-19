import { Link, useNavigate } from "react-router-dom";

interface Column {
    key: string;
    label: string;
    link?:string;
}

interface Props {
    columns: Column[];
    data: any[];
}

const DataTable = ({ columns, data }: Props) => {
    const navigate=useNavigate();
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
                    <td  key={col.key} className="p-3">
                        <button
                        type="button"
                        onClick={() => {
                            const path = row['link'] ? row['link'] : null;

                            if (path) navigate(path);
                        }}
                        className="text-black-500 hover:text-blue-700"
                        >
                        {row[col.key]}
                        </button>
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