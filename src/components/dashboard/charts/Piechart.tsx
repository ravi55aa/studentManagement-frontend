import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#16a34a", "#4ade80", "#22c55e", "#86efac"];

const TeacherPieChart = ({ data }: any) => {
    return (
        <div className="hover:shadow-md transition duration-200 bg-white p-5 rounded-2xl shadow-sm border border-green-100">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
            Teacher Distribution
        </h3>

        <div className="h-72">
            <ResponsiveContainer>
            <PieChart>
                <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
                >
                {data?.map((entry: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>

                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
};

export default TeacherPieChart;