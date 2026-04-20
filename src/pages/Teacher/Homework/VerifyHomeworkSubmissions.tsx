import { StudentHomeworkService } from "@/api/Services/Student/studentHomeworkService";
import { Roles } from "@/constants/role.enum";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { HomeworkSubmitStatus, IHomework, IHomeworkSubmission } from "@/interfaces/IHomework";
import { storeStudentsHomeworks } from "@/utils/Redux/Reducer/studentHomework.submissions.reducer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"; 
import HomeworkCard from "@/components/HomeworkCard";
import { HomeworkService } from "@/api/Services/Teacher/homework.service";


const statusColors: Record<HomeworkSubmitStatus, string> = {
    pending: "bg-gray-100 text-gray-600",
    submitted: "bg-green-100 text-green-700",
    verified: "bg-emerald-200 text-emerald-800",
    repeat: "bg-red-100 text-red-600",
};

const VerifyHomeworkSubmissions = () => {
    const [data, setData] = useState<IHomeworkSubmission[]>([]);
    const [selected, setSelected] = useState<IHomeworkSubmission>(null);
    const [status, setStatus] = useState<HomeworkSubmitStatus>("pending");
    const [remark, setRemark] = useState("");
    const [homework,setHomework]=useState<IHomework>();

    const dispatch=useAppDispatch();
    const {homeworkId}=useParams();
    const studentsHomeworks = useAppSelector((state) =>state.studentsHomeworks);
    
    const fetchData = async () => {
        const res = await StudentHomeworkService.getAllSubmissions(
            { homeworkId });

            if (!res.success) {
                toast.error(res.error.message);
                dispatch(storeStudentsHomeworks([]));
                return;
            }
        const submissions=res.data?.data||[];

        setData(submissions);

        dispatch(storeStudentsHomeworks(submissions));
    };

    useEffect(() => {
        if (!homeworkId) {
            toast.warn("Invalid homework id");
            return;
        }

        const fetchHomeWork=async()=>{
            const res=await HomeworkService.getById(homeworkId);
            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }
            const hw=res.data?.data;
            setHomework(hw);
        }
            
        fetchHomeWork()
        fetchData();
    }, [homeworkId]); 

    const handleView = (item:IHomeworkSubmission) => {
        setSelected(item);
        setStatus(item.status);
        setRemark(item.remark || "");
    };
    
    const handleClose = () => {
        setSelected(null);
    };

    
    const handleUpdate = async() => {
        if (!selected) return;
        
        const updated = data.map((d) =>
            d._id === selected._id ? { ...d, status, remark } : d);

        const updateHomework=updated.find((d)=>d._id==selected._id);
        
        setData(updated);

        const res=await StudentHomeworkService.update(selected._id,updateHomework);

        if(!res.success){
            toast.error(res.error.message);
            return res.success;
        };
        
        handleClose();

        await fetchData();
        return res.success;
    };

    const handleUpdateAll=async()=>{
        //:status and :remark are update with homeworkId, method:put

        const res=await StudentHomeworkService.updateMany(Roles.Teacher,homeworkId,data);
        
        if(!res.success){
            toast.error(res.error?.message);
            return res.success;
        } //res.data update to studentHomeworkSubmission redux store;

        dispatch(storeStudentsHomeworks(res.data.data));

        return res.success;
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
            {/* 
                
                Homework Details 

            */}
        <h1 className="text-2xl font-semibold mb-6">
            Homework Details
        </h1>
        
        <HomeworkCard
                title={homework?.title}
                description={homework?.description}

                attachments={homework?.attachments}

                links={[]}
            />
        <br /><hr className="border border-green-700" /><br />  



            {/* 
                
                Homework Submission 

            */}
            
        <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-semibold text-green-700 ">
                Homework Submissions
            </h2>
            <button
                type='button' onClick={handleUpdateAll}
                className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800 "
                >
                Update All
            </button>
        </div>



        {/* TABLE */}
        <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-green-50 text-green-800">
            <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
            </tr>
            </thead>

            <tbody>
            {studentsHomeworks.studentsHomeworks?.map((item) => (
                <tr key={item._id} className="border-t hover:bg-green-50/40">
                <td className="p-3">{item.studentId?.name }</td>

                <td className="p-3">
                    <span
                    className={`px-3 py-1 rounded-md text-sm font-medium ${statusColors[item.status]}`}
                    >
                    {item.status}
                    </span>
                </td>

                <td className="p-3 text-center">
                    <button
                    onClick={() => handleView(item)}
                    className="text-green-700 hover:underline font-medium"
                    >
                    View and update
                    </button>

                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* MODAL */}
        {selected && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white  w-full max-w-xl p-6 rounded-xl shadow-lg">

            <div className="bg-gray-100 p-2">

                <h3 className="text-xl font-semibold text-green-700 mb-4">
                {selected.studentId?.name}'s Submission
                </h3>

                {/* NOTE */}
            <div className="mb-4">
                <h4 className="font-medium mb-1">Note</h4>
                <p className="text-gray-700">
                    {selected.note || "No submission"}
                </p>
                </div>

                {/* LINKS */}
                <div className="mb-4">
                <h4 className="font-medium mb-1">Links</h4>
                {selected.links?.length ? (
                    <ul className="space-y-1">
                    {selected.links.map((link, i) => (
                        <li key={i}>
                        <a
                            href={link}
                            target="_blank"
                            className="text-green-600 underline"
                        >
                            {link}
                        </a>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-sm">No links</p>
                )}
                </div>

                {/* ATTACHMENTS */}
                <div className="mb-4">
                <h4 className="font-medium mb-1">Attachments</h4>
                {selected.attachments?.length ? (
                    <ul className="space-y-2">
                    {selected.attachments.map((file, i) => (
                        <li
                        key={i}
                        className="flex justify-between bg-green-50 px-3 py-2 rounded"
                        >
                        <span>{file.fileName}</span>
                        <a
                            href={file.url}
                            target="_blank"
                            className="text-green-700"
                        >
                            View
                        </a>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-sm">No attachments</p>
                )}
                </div>
            </div>

                
                <br />

                {/* STATUS */}
                <div className="mb-4">
                <label className="block mb-1 font-medium text-green-500">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as HomeworkSubmitStatus)}
                    className="w-full border p-2 rounded focus:outline-green-500"
                >
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="verified">Verified</option>
                    <option value="repeat">Repeat</option>
                </select>
                </div>

                {/* REMARK */}
                <div className="mb-4">
                <label className="block text-green-500 mb-1 font-medium">Remark</label>
                <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full border p-2 rounded focus:outline-green-500"
                    rows={3}
                    placeholder="Add remark..."
                />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3">
                <button
                    onClick={handleClose}
                    className="px-4 py-2 border rounded"
                >
                    Cancel
                </button>

                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Update
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default VerifyHomeworkSubmissions;