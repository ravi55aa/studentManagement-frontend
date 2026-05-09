import { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import ChatInputAttachment from "./Components/ChatMessageAttachment";
import {SendHorizonal,Smile,} from 'lucide-react';

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
    <div className="relative border-t border-slate-200 bg-white px-4 py-4">

        {/* ---------- Input Wrapper ---------- */}
        <div
        className="
            flex items-end gap-3
            rounded-[28px]
            border border-slate-200
            bg-slate-100/10
            px-3 py-3
            shadow-sm
            transition-all duration-200
            focus-within:border-emerald-300
            focus-within:ring-4
            focus-within:ring-emerald-100
        "
        >

        {/* ---------- Emoji ---------- */}
        <div className="relative">

            <button
            onClick={() =>
                setShowEmojiPicker((prev) => !prev)
            }
            className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl
                text-slate-500
                transition-all duration-200
                hover:bg-emerald-50
                hover:text-emerald-700
            "
            >
            <Smile className="w-5 h-5" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
            <div
                ref={pickerRef}
                className="absolute bottom-14 left-0 z-50 overflow-hidden rounded-3xl shadow-2xl"
            >
                <Picker
                data={data}
                onEmojiSelect={(emoji: any) =>
                    setInput(
                    (prev) => prev + emoji.native
                    )
                }
                />
            </div>
            )}
        </div>

        {/* ---------- Attachment ---------- */}
        <div
            className="
            flex h-11 w-11 items-center justify-center
            rounded-2xl
            transition-all duration-200
            hover:bg-emerald-50
            "
        >
            <ChatInputAttachment
            file={file}
            setFile={setFile}
            />
        </div>

        {/* ---------- Input ---------- */}
        <div className="flex-1">

            <input
            value={input}
            onChange={(e) =>
                setInput(e.target.value)
            }
            disabled={disabled}
            placeholder="Type your message..."
            className="
                w-full bg-transparent
                px-2 py-2
                text-sm text-slate-700
                placeholder:text-slate-400
                outline-none
            "
            />
        </div>

        {/* ---------- Send ---------- */}
        <button
            onClick={handleSend}
            disabled={disabled}
            className="
            flex h-12 w-12 items-center justify-center
            rounded-2xl
            bg-gradient-to-r
            from-emerald-600
            to-green-600
            text-white
            shadow-md
            transition-all duration-300
            hover:scale-[1.03]
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:opacity-50
            "
        >
            <SendHorizonal className="w-5 h-5" />
        </button>
        </div>

        {/* ---------- Selected File Preview ---------- */}
        {file && (
        <div
            className="
            mt-3
            flex items-center justify-between
            rounded-2xl
            border border-emerald-100
            bg-emerald-50
            px-4 py-3
            "
        >

            <div className="flex items-center gap-3 overflow-hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                📎
            </div>

            <div className="overflow-hidden">
                <p className="truncate text-sm font-medium text-slate-700">
                {file?.name}
                </p>

                <p className="text-xs text-slate-400">
                Ready to send
                </p>
            </div>
            </div>

            <button
            onClick={() => setFile(null)}
            className="
                rounded-xl
                px-3 py-1.5
                text-sm font-medium
                text-red-500
                transition-all duration-200
                hover:bg-red-100
            "
            >
            Remove
            </button>
        </div>
        )}
    </div>
    );
}