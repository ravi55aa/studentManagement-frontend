import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    Area,
    AreaChart,
} from "recharts";

interface Props {
    data: {
        name: string;
        value: number;
    }[];
}

const CustomTooltip = ({
    active,
    payload,
    label,
    }: any) => {

    if (active && payload && payload.length) {
        return (
        <div
            className="
            rounded-2xl
            border border-emerald-100
            bg-white/95
            px-4 py-3
            shadow-xl
            backdrop-blur-xl
            "
        >
            <p className="text-xs font-medium text-slate-500">
            {label}
            </p>

            <h3 className="mt-1 text-lg font-bold text-emerald-700">
            {payload[0].value}%
            </h3>
        </div>
        );
    }

    return null;
    };

    const SimpleLineChart = ({ data }: Props) => {

    return (
        <div className="h-28 w-full">

        <ResponsiveContainer
            width="100%"
            height="100%"
        >

            <AreaChart
            data={data}
            margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 0,
            }}
            >

            {/* Gradient */}
            <defs>
                <linearGradient
                id="colorAttendance"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                >
                <stop
                    offset="5%"
                    stopColor="#10b981"
                    stopOpacity={0.35}
                />

                <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0}
                />
                </linearGradient>
            </defs>

            {/* Tooltip */}
            <Tooltip
                content={<CustomTooltip />}
                cursor={{
                stroke: "#10b981",
                strokeWidth: 1,
                strokeDasharray: "4 4",
                }}
            />

            {/* Area */}
            <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#colorAttendance)"
            />

            {/* Line */}
            <Line
                type="monotone"
                dataKey="value"
                stroke="#059669"
                strokeWidth={3}
                dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#ffffff",
                stroke: "#059669",
                }}
                activeDot={{
                r: 6,
                fill: "#059669",
                stroke: "#ffffff",
                strokeWidth: 3,
                }}
            />
            </AreaChart>
        </ResponsiveContainer>
        </div>
    );
};

export default SimpleLineChart;