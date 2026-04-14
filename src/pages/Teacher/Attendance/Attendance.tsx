
import { AttendanceService } from '@/api/Services/Student/attendanceService';
import { StudentService } from '@/api/Services/Student/student.service'
import { ActionBtn, Pagination } from '@/components'
import RemarkModal, { ViewStudentModal } from '@/components/Attendance';
import SearchAndFilter from '@/components/SearchAndFilter'
import { TableComponent } from '@/components/Table.Component'
import { Roles } from '@/constants/role.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { ILeaveDocument, IStudentAttendance } from '@/interfaces/IAttendance';
import { IStudent } from '@/interfaces/IStudent';
import { AttendanceStatus } from '@/types/student.types';
import { storeStudents } from '@/utils/Redux/Reducer/students.reducer';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Attendance = () => {

    const [search, setSearch] = useState('');
    const studentsStore = useAppSelector((state) => state.students);
    const [attendanceList,setAttendanceList]=useState<IStudentAttendance[]>([]);

    // Modal states
    const [selectedStudent, setSelectedStudent] = useState<{student:IStudent,leaveHistory:ILeaveDocument|null}>({student:null,leaveHistory:null});
    const [remarkModal, setRemarkModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
    const [remarkText, setRemarkText] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const dispatch = useAppDispatch();
    const {batchId}=useParams();

    //Get all Students from BatchId
    useEffect(() => {
        if(!batchId){
            toast.warn('No batchId, kindly re-login');
            return;
        }

    (async () => {
        const res = await StudentService.getALLWithQuery(Roles.Teacher,{batch:batchId});

        if (!res.success) {
            toast.warn(res.error.message);
            return res.success;
        }

        const students = res.data.data;
        dispatch(storeStudents(students));
    })();
    }, [dispatch, studentsStore.loading]);

    //Get All Attendances of the above all Students 
    useEffect(() => {
        if(!batchId){
            toast.warn('No batchId, kindly re-login');
            return;
        }

    (async () => {
        //Get AttendanceList of particular day
        
        const res = await AttendanceService.getAttendanceOfBatch(Roles.Teacher,{batchId:batchId,date:selectedDate});


        //Batch Attendance report with date;
        const BatchAttendanceReport = res.data?.data;
        
        const initial: IStudentAttendance[] = studentsStore.students?.map((student) => {
            
            const existing = BatchAttendanceReport?.students?.find(
                (element: IStudentAttendance) => element.studentId === student._id
            );

            if (existing) {
                return {
                    studentId: student._id,
                    status: existing.status,
                    remark: existing.remark,
                };
            }

            return {
                studentId: student._id,
                status:'',
                remark: '',
            };
        });

        setAttendanceList(initial);

        return res.success;
    })();
    }, [dispatch, studentsStore.loading,selectedDate]);

    // Update status
    function handleStatusChange(studentId: string, status: AttendanceStatus)  {
        
        setAttendanceList((prev) =>
            prev.map((item) =>
            item.studentId === studentId ? { ...item, status } : item
            )
        );
    };

    // Open remark modal
    const handleOpenRemark = (studentId: string) => {
        setCurrentStudentId(studentId);
        setRemarkModal(true);
    };

    // Save remark
    const handleSaveRemark = () => {
        setAttendanceList((prev) =>
            prev.map((item) =>
            item.studentId === currentStudentId
                ? { ...item, remark: remarkText }
                : item
            )
        );

        setRemarkModal(false);
        setRemarkText("");
    };

    // View student
    const handleViewStudent = async (student: IStudent) => {
        
        //here fetchThe studentLeave
        const res=await AttendanceService.getLeaveHistory(Roles.Student,student._id,selectedDate);
        
        setViewModal(true);
        setSelectedStudent({student,leaveHistory:res?.data?.data[0]});

        return res.success;
    };
    
    const handleUpdateAttendance=async()=>{

        const res=await AttendanceService.update(Roles.Teacher,attendanceList,batchId,selectedDate);

        if(!res.success){
            toast.warn(res.error.message);
            return res.success;
        }

        toast.success(res.data?.message);
        return res.success;
    }

    /* ---------- Filtering ---------- */
    const filteredStudents = studentsStore?.students?.filter(
    (student: IStudent) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()),
    );


    return (
        <div className="p-6 bg-[#ffffff] min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-md text-sm bg-white">Export CSV</button>
            <button type='button' onClick={handleUpdateAttendance} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
                Update Attendance
            </button>
            </div>

            <Bell className="text-green-700 w-5 h-5" />
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
            <select className="border px-3 py-2 rounded-md text-sm w-40">
                <option>Add Filter</option>
                <option>Male</option>
                <option>Female</option>
            </select>

            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-700 outline-none"
            />
        </div>
        

        <TableComponent
            data={studentsStore?.students ?? []}
            keyField="_id"
            loading={studentsStore?.loading}
            emptyMessage="No Students found"
            columns={[
                { header: "Name", accessor: "name" },
                { header: "Email", accessor: "email" },

                // STATUS BUTTON GROUP
                {
                header: "Attendance",
                render: (student) => {
                    const current = attendanceList.find(
                    (a) => a.studentId === student._id
                    );

                    return (
                    <div className="flex gap-2">
                        {["present", "absent", "late", "leave"].map((s:AttendanceStatus) => (
                        <button
                            key={s}
                            onClick={() => handleStatusChange(student._id, s)}
                            className={`px-2 py-1 rounded text-xs capitalize
                            ${
                                current?.status === s
                                ? s === "present"
                                    ? "bg-green-600 text-white"
                                    : s === "absent"
                                    ? "bg-red-500 text-white"
                                    : s === "late"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-purple-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {s}
                        </button>
                        ))}
                    </div>
                    );
                },
                },

                // REMARK BUTTON
                {
                header: "Remark",
                render: (student) => (
                    <button
                    onClick={() => handleOpenRemark(student._id)}
                    className="text-green-700 underline text-sm"
                    >
                    Add
                    </button>
                ),
                },

                // ACTIONS
                {
                header: "Actions",
                align: "center",
                render: (student) => (
                    <button
                    onClick={() => handleViewStudent(student)}
                    className="text-green-700 hover:underline"
                    >
                    View
                    </button>
                ),
                },
            ]}
            />

        <ViewStudentModal 
            viewModal={viewModal} 
            selectedStudent={selectedStudent.student} 
            leaveHistory={selectedStudent.leaveHistory} 
            setViewModal={setViewModal} 
        />

        <RemarkModal 
            handleSaveRemark={handleSaveRemark}
            remarkModal={remarkModal}
            remarkText={remarkText}
            setRemarkModal={setRemarkModal}
            setRemarkText={setRemarkText}
        />

        {/* ---------- Mobile Card View ---------- */}
        <div className="lg:hidden space-y-4">
            {filteredStudents.map((batch) => (
            <div key={batch?._id} className="bg-white border rounded-md p-4">
                <div className="font-semibold">{batch.name}</div>
                {/* <div className="text-sm text-gray-600">
                    {batch.center && batch.center?.name}
                    </div> */}
                <div className="text-sm">Counselor: Murali Manohar</div>
                <div className="text-sm mb-3">Code: {batch.email}</div>

                <div className="flex flex-wrap gap-2">
                <ActionBtn label="Mark Attendance" path={`mark/${batch?._id}`} />
                </div>
            </div>
            ))}
        </div>

        <Pagination />
        </div>
    )
}

export default Attendance



//Show the attendance of that particular day
//by using the date query
//fetch the particular attendance details, if not found, by default value will be applied