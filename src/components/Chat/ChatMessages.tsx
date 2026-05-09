import { IMessage } from "@/interfaces/IChat";
import { useEffect, useRef, useState } from "react";

const ChatMessages = ({
    messages,
    userId,
    }: {
    messages: IMessage[];
    userId: string;
    }) => {

    const [previewFile, setPreviewFile] = useState<{
        url: string;
        type: string;
        fileName?: string;
    } | null>(null);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);
    
    const formatTime = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        });
    };


    const getFileType = (fileName: string, url: string) => {
        const ext = (fileName || url)?.split(".").pop()?.toLowerCase();

        if (!ext) return "other";

        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
        if (["mp4", "webm", "ogg"].includes(ext)) return "video";
        if (ext === "pdf") return "pdf";

        return "other";
    };


return (
    <>
        {/* ---------- Chat Container ---------- */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 bg-gradient-to-b from-slate-50 to-white">

        {messages?.map((msg: IMessage, i: number) => {

            const senderId =
            typeof msg?.senderId === "string"
                ? msg?.senderId
                : msg?.senderId?._id;

            const isOwn = senderId === userId;

            return (
            <div
                key={i}
                className={`flex flex-col ${
                isOwn
                    ? "items-end"
                    : "items-start"
                }`}
            >

                {/* ---------- Sender Name ---------- */}
                {!isOwn && (
                <span className="mb-2 px-1 text-xs font-medium text-slate-500">
                    {msg?.senderId?.firstName ||
                    msg?.senderId?.name ||
                    "User"}
                </span>
                )}

                {/* ---------- Message Bubble ---------- */}
                <div
                className={`
                    relative
                    max-w-[85%] md:max-w-[70%]
                    rounded-3xl
                    px-4 py-3
                    shadow-sm
                    transition-all duration-200
                    ${
                    isOwn
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-br-md"
                        : "bg-white border border-slate-200 text-slate-700 rounded-bl-md"
                    }
                `}
                >

                {/* Message */}
                {msg?.message && (
                    <p className="text-sm leading-6 whitespace-pre-wrap break-words">
                    {msg?.message}
                    </p>
                )}

                {/* ---------- Attachments ---------- */}
                {msg?.attachments?.length > 0 && (
                    <div className="mt-3 space-y-3">

                    {msg.attachments.map(
                        (file: any, idx: number) => {

                        const type = getFileType(
                            file.fileName,
                            file.url
                        );

                        /* ---------- IMAGE ---------- */
                        if (type === "image") {
                            return (
                            <div
                                key={idx}
                                className="group relative overflow-hidden rounded-2xl border border-white/10"
                            >

                                <img
                                src={file.url}
                                alt={file.fileName}
                                onClick={() =>
                                    setPreviewFile({
                                    url: file.url,
                                    type: "image",
                                    fileName:
                                        file.fileName,
                                    })
                                }
                                className="
                                    max-h-[240px]
                                    w-full
                                    cursor-pointer
                                    object-cover
                                    transition-transform duration-300
                                    group-hover:scale-[1.02]
                                "
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                            </div>
                            );
                        }

                        /* ---------- VIDEO ---------- */
                        if (type === "video") {
                            return (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-black"
                            >
                                <video
                                src={file.url}
                                controls
                                className="max-h-[280px] w-full"
                                />
                            </div>
                            );
                        }

                        /* ---------- PDF ---------- */
                        if (type === "pdf") {
                            return (
                            <button
                                key={idx}
                                onClick={() =>
                                setPreviewFile({
                                    url: file.url,
                                    type: "pdf",
                                    fileName:
                                    file.fileName,
                                })
                                }
                                className={`
                                flex w-full items-center gap-4
                                rounded-2xl border
                                px-4 py-3
                                text-left
                                transition-all duration-200
                                ${
                                    isOwn
                                    ? "border-white/20 bg-white/10 hover:bg-white/20"
                                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                                }
                                `}
                            >

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                                📄
                                </div>

                                <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-semibold">
                                    {file.fileName ||
                                    "Document.pdf"}
                                </p>

                                <p
                                    className={`text-xs ${
                                    isOwn
                                        ? "text-emerald-100"
                                        : "text-slate-400"
                                    }`}
                                >
                                    Click to preview
                                </p>
                                </div>
                            </button>
                            );
                        }

                        /* ---------- OTHER FILE ---------- */
                        return (
                            <a
                            key={idx}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                flex items-center gap-4
                                rounded-2xl border
                                px-4 py-3
                                transition-all duration-200
                                ${
                                isOwn
                                    ? "border-white/20 bg-white/10 hover:bg-white/20"
                                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                                }
                            `}
                            >

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                📎
                            </div>

                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-semibold">
                                {file.fileName ||
                                    "Attachment"}
                                </p>

                                <p
                                className={`text-xs ${
                                    isOwn
                                    ? "text-emerald-100"
                                    : "text-slate-400"
                                }`}
                                >
                                Download file
                                </p>
                            </div>
                            </a>
                        );
                        }
                    )}
                    </div>
                )}
                </div>

                {/* ---------- Time ---------- */}
                <span className="mt-2 px-1 text-[11px] text-slate-400">
                {formatTime(msg?.createdAt)}
                </span>
            </div>
            );
        })}

        <div ref={bottomRef} />
        </div>

        {/* ---------- Preview Modal ---------- */}
        {previewFile && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                <div>
                <h3 className="font-semibold text-slate-800">
                    {previewFile.fileName || "Preview"}
                </h3>

                <p className="text-sm text-slate-400">
                    Attachment Preview
                </p>
                </div>

                <button
                onClick={() => setPreviewFile(null)}
                className="
                    flex h-10 w-10 items-center justify-center
                    rounded-2xl bg-slate-100
                    text-slate-600 transition-all
                    hover:bg-slate-200
                "
                >
                ✕
                </button>
            </div>

            {/* Body */}
            <div className="max-h-[85vh] overflow-auto bg-slate-50 p-4">

                {/* Image */}
                {previewFile.type === "image" && (
                <img
                    src={previewFile.url}
                    className="max-h-[80vh] w-full rounded-2xl object-contain"
                />
                )}

                {/* PDF */}
                {previewFile.type === "pdf" && (
                <iframe
                    src={previewFile.url}
                    className="h-[80vh] w-full rounded-2xl bg-white"
                />
                )}
            </div>
            </div>
        </div>
        )}
    </>
    );
};

export default ChatMessages;