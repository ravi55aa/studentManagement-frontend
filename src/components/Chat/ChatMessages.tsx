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

    const getFileType = (fileName: string, url: string) => {
        const ext = (fileName || url).split(".").pop()?.toLowerCase();

        if (!ext) return "other";

        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
        if (["mp4", "webm", "ogg"].includes(ext)) return "video";
        if (ext === "pdf") return "pdf";

        return "other";
    };



    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((msg: IMessage, i: number) => {
            
            const senderId= typeof msg?.senderId === "string" ?  msg?.senderId : msg?.senderId?._id;

            const isOwn = senderId === userId;

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

                {/* //Attachment */}

                {msg.attachments?.length > 0 && (
                <div className="space-y-2">
                    {msg.attachments.map((file: any, idx: number) => {
                        const type = getFileType(file.fileName, file.url);

                        if (type === "image") {
                        return (
                            <img
                            key={idx}
                            src={file.url}
                            alt={file.fileName}
                            onClick={()=>console.log('hii')}
                            className="w-40 rounded-md object-cover cursor-pointer"
                            />
                        );
                        }

                        if (type === "video") {
                        return (
                            <video
                            key={idx}
                            src={file.url}
                            controls
                            className="w-48 rounded-md"
                            />
                        );
                        }

                        if (type === "pdf") {
                        return (
                            <a
                            key={idx}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 bg-black/10 rounded-md text-xs underline"
                            >
                            📄 {file.fileName || "Open PDF"}
                            </a>
                        );
                        }

                        // fallback
                        return (
                        <a
                            key={idx}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 bg-black/10 rounded-md text-xs underline"
                        >
                            📎 {file.fileName || "Download file"}
                        </a>
                        );
                    })}
                    </div>
                )}
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