import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: {
        name: string;
        attendance: number;
        performance: number;
    }[];
}

const AttendancePerformanceChart = ({ data }: Props) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-green-100">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
            Attendance vs Performance
        </h3>

        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
                <XAxis
                type="number"
                dataKey="attendance"
                name="Attendance %"
                unit="%"
                />
                <YAxis
                type="number"
                dataKey="performance"
                name="Performance"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                data={data}
                fill="#16a34a"
                />
            </ScatterChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
};

export default AttendancePerformanceChart;