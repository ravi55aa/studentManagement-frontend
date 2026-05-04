const SectionWrapper = ({ title, children }: any) => {
    return (
        <div className="hover:shadow-md transition duration-200 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {children}
        </div>
    );
};

export default SectionWrapper;