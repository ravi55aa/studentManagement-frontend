const ChatHeader = ({ title }: { title: string }) => {
    return (
        <div className="p-4 border-b bg-white">
        <h3 className="font-semibold text-green-700">{title}</h3>
        </div>
    );
};

export default ChatHeader;