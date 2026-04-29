import { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import ChatInputAttachment from "./Components/ChatMessageAttachment";

export default function ChatInput({ onSend, disabled }: any) {
    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const pickerRef = useRef<HTMLDivElement | null>(null);

    // close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
            setShowEmojiPicker(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSend=()=>{
        const formData= new FormData();

        formData.append("message", String(input)?.trim()||"");
        
        if(file){
            formData.append("docs", file);
        }

        onSend(formData);

        setInput("");
        setFile(null);
        return true;
    }

    return (
        <div className="relative p-4 border-t bg-white flex gap-2 items-center">

        {/* Emoji Button */}
        <button
            onClick={() => setShowEmojiPicker(prev => !prev)}
            className="text-xl grayscale-500"
        >
            😊
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
            <div
            ref={pickerRef}
            className="absolute bottom-14 left-2 z-50"
            >
            <Picker
                data={data}
                onEmojiSelect={(emoji: any) =>
                setInput(prev => prev + emoji.native)
                }
            />
            </div>
        )}

        {/* Attachment */}
        <ChatInputAttachment file={file} setFile={setFile} />

        {/* Input */}
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
            placeholder="Type a message..."
            className="flex-1 border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-700 outline-none"
        />


        {/* Send Button */}
        <button
            onClick={handleSend}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
            Send
        </button>
        </div>
    );
}