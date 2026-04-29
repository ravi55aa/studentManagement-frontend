import { useRef } from "react";

export default function ChatInputAttachment({ file, setFile }: { file: File | null; setFile: (file: File | null) => void }) {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: any) => {
        const selected = e.target.files[0];
        if (selected) {
        setFile(selected);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="p-4 relative bg-white">

        {/*  Preview Section */}
        {file && (
            <div className="mb-3 w-30 absolute bottom-10 left-0 p-2 bg-white border rounded-md">
            {file.type.startsWith("image") ? (
                <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-32 h-32 object-cover rounded-md"
                />
            ) : file.type.startsWith("video") ? (
                <video
                src={URL.createObjectURL(file)}
                className="w-40 h-32 rounded-md"
                controls
                />
            ) : (
                <div className="px-3 py-2 bg-gray-100 rounded-md text-sm">
                📄 {file.name}
                </div>
            )}

            {/*  Remove */}
            <button
                onClick={handleRemoveFile}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2 text-xs"
            >
                ✕
            </button>
            </div>
        )}

        {/*  Input Row */}
        <div className="flex gap-2 items-center">

            {/* 📎 Attachment Button */}
            <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xl"
            >
            📎
            </button>

            {/* Hidden File Input */}
            <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            hidden
            />
        </div>
        </div>
    );
}