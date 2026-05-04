interface Props {
    data: {
        title: string;
        date: string;
    }[];
}

const Timeline = ({ data }: Props) => {
    return (
        <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
            Upcoming Deadlines
        </h3>

        {data.length ?
        <div className="space-y-4 hover:shadow-md transition duration-200">
            {data.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 bg-green-600 rounded-full" />
                <div>
                <p className="text-sm font-medium">{item?.title ||'no-title'}</p>
                <p className="text-xs text-gray-500">{item?.date || '0000-00-00'}</p>
                </div>
            </div>
            ))}
        </div>
        : 'No-timeline data'    
    }
        </div>
    );
};

export default Timeline;