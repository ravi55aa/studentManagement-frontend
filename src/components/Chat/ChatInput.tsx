import { useState } from "react";

const ChatInput = ({ onSend, disabled }: any) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        onSend(input);
        setInput("");
    };

    return (
        <div className="p-4 border-t bg-white flex gap-2">
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
            placeholder="Type a message..."
            className="flex-1 border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-700 outline-none"
        />

        <button
            onClick={handleSend}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
            Send
        </button>
        </div>
    );
};

export default ChatInput;