import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { name: string; value: number }[];
    title?: string;
}

const HorizontalBarChart = ({ data, title }: Props) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-green-100">
        {title && (
            <h3 className="text-md font-semibold text-gray-700 mb-4">
            {title}
            </h3>
        )}

        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data}>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar
                dataKey="value"
                fill="#16a34a"
                radius={[0, 6, 6, 0]}
                />
            </BarChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
};

export default HorizontalBarChart;