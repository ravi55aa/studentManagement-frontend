import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { StudentService } from "@/api/Services/Student/student.service";
import { toast } from "react-toastify";
import { AttendanceService } from "@/api/Services/Student/attendanceService";
import { Roles } from "@/constants/role.enum";

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};


const StudentAttendance = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const {user}=useAppSelector((state)=>state.currentUser);

    const [leaveModal, setLeaveModal] = useState(false);
    const [leaveData, setLeaveData] = useState({
        subject: "",
        body: "",
        attachment: null as File | null,
    });
    const [attendanceMap,setAttendanceMap]=useState({});
    
    useEffect(()=>{
        const fetchStudentAttendance=async()=>{

            //fetchAttendance
            const res=await AttendanceService.getAStudentList(Roles.Student,{studentId:user.id,year:2026,month:3});

            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }

            const attendance=res.data?.data;

            setAttendanceMap(attendance);
            return res.success;

        }
        fetchStudentAttendance();
    },[]);


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getDaysInMonth(year, month);

    // Month Change
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // yyyy-mm
        const [y, m] = value.split("-");
        setCurrentDate(new Date(Number(y), Number(m) - 1));
    };

    //  Leave Handlers
    const handleLeaveChange = (e: any) => {
        const { name, value, files } = e.target;

        if (name === "attachment") {
        setLeaveData((prev) => ({
            ...prev,
            attachment: files[0],
        }));
        } else {
        setLeaveData((prev) => ({
            ...prev,
            [name]: value,
        }));
        }
    };

    const handleSubmitLeave = () => {
        console.log("Leave Data:", leaveData);

        // TODO: API call

        setLeaveModal(false);
        setLeaveData({ subject: "", body: "", attachment: null });
    };

    // Status Color
    const getColor = (day: number) => {
        const status = attendanceMap[day];

        if (status === "present") return "bg-green-500 text-white";
        if (status === "absent") return "bg-red-500 text-white";
        if (status === "leave") return "bg-red-600 text-white";
        if (status === "late") return "bg-orange-400 text-white";

        return "bg-gray-100 text-gray-600";
    };

    return (
        <div className="p-6 bg-white min-h-screen">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
            <button
            onClick={() => setLeaveModal(true)}
            className="bg-green-700 text-white px-4 py-2 rounded-md"
            >
            Apply for Leave
            </button>

            <Bell className="text-green-700" />
        </div>

        {/* TITLE + FILTER */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Attendance</h2>

            <input
            type="month"
            onChange={handleMonthChange}
            className="border p-2 rounded"
            />
        </div>

        {/* DAYS HEADER */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d}>{d}</div>
            ))}
        </div>

        {/* CALENDAR */}
        <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: days }, (_, i) => {
            const day = i + 1;

            return (
                <div
                key={day}
                className={`h-12 flex items-center justify-center rounded-md text-sm font-medium ${getColor(
                    day
                )}`}
                >
                {day}
                </div>
            );
            })}
        </div>

        {/* LEAVE MODAL */}
        {leaveModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4 text-green-700">
                Apply Leave
                </h3>

                <input
                name="subject"
                value={leaveData.subject}
                onChange={handleLeaveChange}
                placeholder="Subject"
                className="w-full border p-2 rounded mb-3"
                />

                <textarea
                name="body"
                value={leaveData.body}
                onChange={handleLeaveChange}
                placeholder="Write your reason..."
                className="w-full border p-2 rounded mb-3"
                rows={3}
                />

                <input
                type="file"
                name="attachment"
                onChange={handleLeaveChange}
                className="mb-4"
                />

                <div className="flex justify-end gap-3">
                <button
                    onClick={() => setLeaveModal(false)}
                    className="border px-4 py-2 rounded"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmitLeave}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default StudentAttendance;