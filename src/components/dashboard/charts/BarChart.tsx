import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    title:string,
    data: { name: string; value: number }[];
}

const SubjectBarChart = ({ data,title }: Props) => {
    return (
        <div className="h-64 bg-white p-4 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition duration-200">
        <h3 className="text-md font-semibold text-gray-700 mb-3">
            {title || "Distribution of data"}
        </h3>

        {data &&

        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>}
        </div>
    );
};

export default SubjectBarChart;