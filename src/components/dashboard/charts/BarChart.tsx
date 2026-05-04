import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { name: string; value: number }[];
}

const SubjectBarChart = ({ data }: Props) => {
    return (
        <div className="h-64 bg-white p-4 rounded-2xl shadow-sm border border-green-100">
        <h3 className="text-md font-semibold text-gray-700 mb-3">
            Subject Distribution
        </h3>

        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default SubjectBarChart;