const ChatSidebar = ({
    activeTab,
    setActiveTab,
    rooms,
    onSelectRoom,
    }: any) => {
    return (
        <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold text-green-700 mb-4">Chats</h2>

        {/* Tabs */}
        <div className="flex flex-col gap-2">
            {["direct", "batch", "center"].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-3 py-2 rounded-md text-sm ${
                activeTab === tab
                    ? "bg-green-700 text-white"
                    : "hover:bg-green-50"
                }`}
            >
                {tab === "direct" && "Direct"}
                {tab === "batch" && "Batch"}
                {tab === "center" && "Center"}
            </button>
            ))}
        </div>

        {/* Rooms */}
        <div className="mt-6 space-y-2">
            {rooms.map((room: any) => (
            <div
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className="p-2 rounded-md hover:bg-green-50 cursor-pointer text-sm"
            >
                {room.name}
            </div>
            ))}
        </div>
        </div>
    );
};

export default ChatSidebar;