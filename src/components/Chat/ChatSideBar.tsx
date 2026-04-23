import { StudentService } from "@/api/Services/Student/student.service";
import { TeacherService } from "@/api/Services/teacher.service";
import { paginationQuery } from "@/constants/pagination";
import { Roles } from "@/constants/role.enum";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { IStudent } from "@/interfaces/IStudent";
import { ITeacherBio } from "@/interfaces/ITeacher";
import { useEffect, useState } from "react";

const ChatSidebar = ({
    activeTab,
    setActiveTab,
    rooms,
    onSelectRoom,
    onStartDirectChat, 
    }: any) => {
    const [directChatUsers, setUsers] = useState<{teachers:ITeacherBio[]|null,students:IStudent[]|null}>({teachers:null,students:null});

    const {user}=useAppSelector((state)=>state.currentUser);

    // Fetch teachers when Direct tab is active
    useEffect(() => {
        if (activeTab === "direct") {
            Roles.Student==user.role 
            ? fetchTeachers() 
            : fetchStudents();
        }
    }, [activeTab]);

    const fetchTeachers = async () => {
        
        try {
        
            const res = await TeacherService.getAll(paginationQuery);
            const resData= res.data.data

            const {teacherBio} = resData.data[0];

            setUsers({teachers:teacherBio,students:null}); 

            //only fetch teachers from same centerId;

        } catch (err) {
            console.error("Error fetching teachers", err);
        }
    };


    const fetchStudents = async () => {
        
        try {
            const res = await StudentService.getALLWithQuery(paginationQuery);
            
            if(!res.success) {

                return res.success;
            }

            const students:IStudent[] = res.data?.data;

            setUsers({students,teachers:null}); //only fetch teachers from same centerId;

        } catch (err) {

            console.error("Error fetching Students", err.message);
        }
    };


    return (
        <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold text-green-700 mb-4">Chats</h2>

        {/* Tabs */}
        <div className="flex flex-col gap-2">
            {["direct", "batch"].map((tab) => (
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
            </button>
            ))}
        </div>

        {/*  DIRECT TAB → Show Teachers */}
        {activeTab === "direct" && (
            <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-500 mb-2">
                Select a {user.role=='Teacher'?'Student':'Teacher'}
            </p>

            {   
            user.role==Roles.Student 
                ?
                (directChatUsers?.teachers?.map((teacher: ITeacherBio) => (
                    <div
                    key={teacher?._id}
                    onClick={() => onStartDirectChat(teacher)}
                    className="p-2 rounded-md border hover:bg-green-50 cursor-pointer text-sm"
                    >
                    {teacher?.firstName.toUpperCase()}
                    </div>
                )))
                :
                (directChatUsers.students?.map((student: IStudent) => (
                    <div
                    key={student?.dateOfBirth}
                    onClick={() => onStartDirectChat(student)}
                    className="p-2 rounded-md border hover:bg-green-50 cursor-pointer text-sm"
                    >
                    {student?.name.toUpperCase()}
                    </div>
                )))
            }

            </div>
        )}
        </div>
    );
};

export default ChatSidebar;