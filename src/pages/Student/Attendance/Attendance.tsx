import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { toast } from "react-toastify";
import { AttendanceService } from "@/api/Services/Student/attendanceService";
import { ILeaveDocument } from "@/interfaces/IAttendance";
import { handleValidationOF } from "@/validation/validateFormData";
import { leaveSchema } from "@/validation/student.validation";
import NotificationModal from "@/components/Notification/component/NotificationModal";

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};


const StudentAttendance = () => {

    //Notification
    const [open, setOpen] = useState(false);

    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const {user}=useAppSelector((state)=>state.currentUser);

    const [leaveModal, setLeaveModal] = useState(false);
    const [leaveData, setLeaveData] = useState<ILeaveDocument>({
        reason: "",
        body: "",
        attachment: null as File | null,
        date:null,
    });
    const [attendanceMap,setAttendanceMap]=useState({});
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getDaysInMonth(year, month);
    
    useEffect(()=>{
        const fetchStudentAttendance=async()=>{

            //fetchAttendance
            const res=await AttendanceService.getAStudentList({studentId:user.id,year,month});

            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }

            const attendance=res.data?.data;

            setAttendanceMap(attendance);
            return res.success;

        }
        fetchStudentAttendance();
    },[month]);


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

    const handleSubmitLeave = async():Promise<boolean> => {
        // then do validation on leaveData;
        const isValidation=handleValidationOF(leaveSchema,leaveData);

        if(!isValidation.success){
            return isValidation.success;
        }

        const res=await AttendanceService.applyLeave(leaveData,user.id);

        if(!res.success){
            toast.warn(res.error.message);
            return res.success;
        }

        toast.success(res.data.message);
        setLeaveModal(false);
        setLeaveData({ reason: "", body: "", attachment: null,date:null });
        res.success;
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 p-4 md:py-0">

        {/* Main Container */}
        <div className="rounded-[30px] border border-emerald-100 bg-white shadow-[0px_10px_40px_rgba(16,185,129,0.08)] overflow-hidden">

        {/* ---------- Header ---------- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 md:px-8 py-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50">

            {/* Title */}
            <div>
            <h1 className="text-3xl font-bold text-slate-800">
                Attendance Calender
            </h1>

            <p className="text-sm text-slate-500 mt-2">
                Monthly attendance overview
            </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

            {/* Leave Button */}
            <button
                onClick={() => setLeaveModal(true)}
                className="
                flex items-center gap-2
                rounded-2xl
                bg-gradient-to-r
                from-emerald-600
                to-green-600
                px-5 py-3
                text-sm font-semibold text-white
                shadow-md
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-lg
                "
            >
                Apply for Leave
            </button>

            {/* Notification */}
            <button
                onClick={() => setOpen(true)}
                className="
                relative
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                border border-emerald-100
                bg-emerald-50
                transition-all duration-300
                hover:bg-emerald-100
                "
            >
                <Bell className="w-5 h-5 text-emerald-700" />

                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-green-500" />
            </button>
            </div>
        </div>

        <NotificationModal
            isOpen={open}
            onClose={() => setOpen(false)}
        />

        {/* ---------- Top Filters ---------- */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 md:px-8 py-6">

            {/* Left */}
            <div>
            </div>

            {/* Month Picker */}
            <div className="flex items-center gap-3">

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">

                <input
                type="month"
                onChange={handleMonthChange}
                className="
                    bg-transparent
                    text-sm font-medium text-slate-700
                    outline-none
                "
                />
            </div>
            </div>
        </div>

        {/* ---------- Calendar Wrapper ---------- */}
        <div className="px-4 md:px-8 pb-8">

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-3 mb-3">

            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                <div
                key={d}
                className="
                    rounded-2xl
                    bg-emerald-50
                    py-4
                    text-center
                    text-xs font-bold tracking-wider
                    text-emerald-700
                    border border-emerald-100
                "
                >
                {d}
                </div>
            ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-3">

            {Array.from({ length: days }, (_, i) => {
                const day = i + 1;

                return (
                <div
                    key={day}
                    className={`
                    group
                    h-12 md:h-16
                    rounded-3xl
                    flex items-center justify-center
                    text-sm md:text-base font-bold
                    shadow-sm
                    transition-all duration-300
                    hover:scale-[1.03]
                    hover:shadow-md
                    ${getColor(day)}
                    `}
                >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                    {day}
                    </span>
                </div>
                );
            })}
            </div>
        </div>
        </div>

        {/* ---------- Leave Modal ---------- */}
        {leaveModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="w-full max-w-lg overflow-hidden rounded-[30px] border border-emerald-100 bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-5">

                <h3 className="text-2xl font-bold text-slate-800">
                Apply Leave
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                Submit your leave request to the administration
                </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">

                {/* Subject */}
                <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject
                </label>

                <input
                    name="reason"
                    value={leaveData.reason}
                    onChange={handleLeaveChange}
                    placeholder="Enter leave subject"
                    className="
                    w-full rounded-2xl border border-slate-200
                    bg-slate-50/70 px-4 py-3
                    text-sm text-slate-700
                    outline-none transition-all
                    focus:border-emerald-300
                    focus:ring-4 focus:ring-emerald-100
                    "
                />
                </div>

                {/* Description */}
                <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                </label>

                <textarea
                    name="body"
                    value={leaveData.body}
                    onChange={handleLeaveChange}
                    placeholder="Write your reason..."
                    rows={4}
                    className="
                    w-full rounded-2xl border border-slate-200
                    bg-slate-50/70 px-4 py-3
                    text-sm text-slate-700
                    outline-none transition-all resize-none
                    focus:border-emerald-300
                    focus:ring-4 focus:ring-emerald-100
                    "
                />
                </div>

                {/* File */}
                <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Attachment
                </label>

                <input
                    type="file"
                    name="attachment"
                    onChange={handleLeaveChange}
                    className="
                    w-full rounded-2xl border border-dashed border-emerald-200
                    bg-emerald-50/40 px-4 py-3 text-sm
                    file:mr-4 file:rounded-xl file:border-0
                    file:bg-emerald-600 file:px-4 file:py-2
                    file:text-sm file:font-medium
                    file:text-white hover:file:bg-emerald-700
                    "
                />
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">

                <button
                onClick={() => setLeaveModal(false)}
                className="
                    rounded-2xl border border-slate-200
                    px-5 py-3 text-sm font-medium text-slate-600
                    transition-all hover:bg-slate-50
                "
                >
                Cancel
                </button>

                <button
                onClick={handleSubmitLeave}
                className="
                    rounded-2xl
                    bg-gradient-to-r from-emerald-600 to-green-600
                    px-6 py-3 text-sm font-semibold text-white
                    shadow-md transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-lg
                "
                >
                Submit Leave
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
);
};

export default StudentAttendance;