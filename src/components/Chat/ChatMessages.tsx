const ChatMessages = ({ messages, userId }: any) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg: any, i: number) => (
            <div
            key={i}
            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.senderId === userId
                ? "bg-green-700 text-white ml-auto"
                : "bg-gray-200"
            }`}
            >
            {msg.message}
            </div>
        ))}
        </div>
    );
};

export default ChatMessages;