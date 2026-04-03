import { IMessage } from "@/interfaces/IChat";

const ChatMessages = ({
    messages,
    userId,
    }: {
    messages: IMessage[];
    userId: string;
    }) => {
    const formatTime = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        });
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg: IMessage, i: number) => {
            const isOwn = msg?.senderId._id === userId;

            return (
            <div
                key={i}
                className={`flex flex-col ${
                isOwn ? "items-end" : "items-start"
                }`}
            >
                {/* 👤 Name */}
                {!isOwn && (
                <span className="text-xs text-gray-500 mb-1">
                    {msg?.senderId?.firstName || msg?.senderId?.name  || "User"}
                </span>
                )}

                {/*  Message Bubble */}
                <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    isOwn
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
                >
                {msg.message}
                </div>

                {/*  Time */}
                <span className="text-[10px] text-gray-400 mt-1">
                {formatTime(msg.createdAt)}
                </span>
            </div>
            );
        })}
        </div>
    );
};

export default ChatMessages;