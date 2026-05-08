import { TableProps } from "@/interfaces/ITableComponents";
import {
  BookOpen,
  CalendarDays,
  Loader2,
} from "lucide-react";

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
    <div className="overflow-hidden rounded-[28px] bg-white border border-slate-200 shadow-[0px_10px_40px_rgba(15,23,42,0.06)]">

      {/* Top Header */}
      <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-white to-emerald-50">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center shadow-sm">
            <BookOpen className="w-7 h-7 text-green-800" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Academic Records
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              School academic activities and assignments
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
          <CalendarDays className="w-4 h-4 text-slate-500" />

          <span className="text-sm font-medium text-slate-600">
            {Date().toString().slice(0,15)}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">

          {/* ---------- Header ---------- */}
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">

              {columns.map((col, i) => (
                <th
                  key={i}
                  style={{ width: col.width }}
                  className={`
                    px-6 py-5
                    text-xs font-bold uppercase tracking-[0.15em]
                    text-slate-500
                    ${
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : "text-left"
                    }
                  `}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* ---------- Body ---------- */}
          <tbody>

            {/* ---------- Loading ---------- */}
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-20"
                >
                  <div className="flex flex-col items-center justify-center gap-4">

                    <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>

                    <div className="text-center">
                      <p className="font-semibold text-slate-700">
                        Loading academic records...
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        Please wait a moment
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (

              /* ---------- Empty ---------- */
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-20"
                >
                  <div className="flex flex-col items-center justify-center text-center">

                    <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
                      <BookOpen className="w-10 h-10 text-slate-400" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-700">
                      No Records Available
                    </h3>

                    <p className="text-sm text-slate-400 mt-2">
                      {emptyMessage}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (

              /* ---------- Rows ---------- */
              data.map((row, index) => (
                <tr
                  key={String(row[keyField])}
                  className={`
                    group
                    border-b border-slate-100
                    transition-all duration-300
                    hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-emerald-50/30
                  `}
                >
                  {columns.map((col, i) => (
                    <td
                      key={i}
                      className={`
                        px-6 py-5
                        text-sm
                        ${
                          col.align === "center"
                            ? "text-center"
                            : col.align === "right"
                            ? "text-right"
                            : "text-left"
                        }
                      `}
                    >
                      <div className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">

                        {(() => {

                          if (col.render) {
                            return col.render(row, index);
                          }

                          if (col.accessor) {
                            const value =
                              typeof col.accessor === "string"
                                ? getNestedValue(row, col.accessor)
                                : row[col.accessor];

                            return col.format
                              ? col.format(value, row)
                              : value;
                          }

                          return null;
                        })()}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}