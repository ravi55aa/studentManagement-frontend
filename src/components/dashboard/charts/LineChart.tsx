import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface Props {
data: { name: string; value: number }[];
}

const SimpleLineChart = ({ data }: Props) => {
    return (
        <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
            <Tooltip />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
            />
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
};

export default SimpleLineChart;