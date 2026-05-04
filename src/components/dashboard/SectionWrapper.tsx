const SectionWrapper = ({ title, children }: any) => {
    return (
        <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {children}
        </div>
    );
};

export default SectionWrapper;