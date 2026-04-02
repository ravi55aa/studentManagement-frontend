import { TeacherService } from "@/api/Services/teacher.service";
import { Roles } from "@/constants/role.enum";
import { ITeacherBio } from "@/interfaces/ITeacher";
import { useEffect, useState } from "react";

const ChatSidebar = ({
    activeTab,
    setActiveTab,
    rooms,
    onSelectRoom,
    onStartDirectChat, 
    }: any) => {
    const [teachers, setTeachers] = useState<ITeacherBio[]>([]);

    // Fetch teachers when Direct tab is active
    useEffect(() => {
        if (activeTab === "direct") {
        fetchTeachers();
        }
    }, [activeTab]);

    const fetchTeachers = async () => {
        try {
        //  replace with your API
        const res = await TeacherService.getAll(Roles.Student);
        const {teacherBio} = res.data.data;
        setTeachers(teacherBio); //only fetch teachers from same centerId;
        } catch (err) {
            console.error("Error fetching teachers", err);
        }
    };

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

        {/*  DIRECT TAB → Show Teachers */}
        {activeTab === "direct" && (
            <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-500 mb-2">
                Select a Teacher
            </p>

            {teachers.map((teacher: ITeacherBio) => (
                <div
                key={teacher?._id}
                onClick={() => onStartDirectChat(teacher)}
                className="p-2 rounded-md border hover:bg-green-50 cursor-pointer text-sm"
                >
                {teacher?.firstName.toUpperCase()}
                </div>
            ))}
            </div>
        )}

        {/*  OTHER TABS → Show Rooms */}
        {activeTab !== "direct" && (
            <div className="mt-6 space-y-2">
            {rooms.map((room: any) => (
                <div
                key={room._id}
                onClick={() => onSelectRoom(room._id)}
                className="p-2 rounded-md hover:bg-green-50 cursor-pointer text-sm"
                >
                {room.name || "Chat"}
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default ChatSidebar;