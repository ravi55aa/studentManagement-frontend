import { TableProps } from "@/interfaces/ITableComponents";

const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export function TableComponent<T>({
    data,
    columns,
    keyField,
    loading = false,
    emptyMessage = "No data found",
    }: TableProps<T>) {
    return (
        <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="min-w-full text-sm">
            {/* ---------- Header ---------- */}
            <thead className="bg-gray-50 border-b text-gray-700">
            <tr>
                {columns.map((col, i) => (
                <th
                    key={i}
                    style={{ width: col.width }}
                    className={`px-4 py-3 font-medium ${
                    col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                >
                    {col.header}
                </th>
                ))}
            </tr>
            </thead>

            {/* ---------- Body ---------- */}
            <tbody>
            {loading ? (
                <tr>
                <td
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500"
                >
                    Loading...
                </td>
                </tr>
            ) : data.length === 0 ? (
                <tr>
                <td
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-400"
                >
                    {emptyMessage}
                </td>
                </tr>
            ) : (
                data.map((row, index) => (
                <tr
                    key={String(row[keyField])}
                    className={`border-b transition-colors ${
                    index % 2 === 1 ? "bg-gray-50" : ""
                    } hover:bg-gray-100`}
                >
                    {columns.map((col, i) => (
                    <td
                        key={i}
                        className={`px-4 py-3 ${
                        col.align === "center"
                            ? "text-center"
                            : col.align === "right"
                            ? "text-right"
                            : "text-left"
                        }`}
                    >
                        {(() => {
                            if (col.render) {
                                return col.render(row, index);
                            }

                            if (col.accessor) {
                                const value =
                                typeof col.accessor === "string"
                                    ? getNestedValue(row, col.accessor)
                                    : row[col.accessor];

                                return col.format ? col.format(value, row) : value;
                            }

                            return null;
                            })()}
                    </td>
                    ))}
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
}




// {
//   header: "Subjects",
//   accessor: "subjects",
//   format: (subjects: string[]) =>
//     subjects?.map((s) => (
//       <span key={s} className="px-2 py-1 bg-gray-200 rounded text-xs mr-1">
//         {s}
//       </span>
//     ))
// }