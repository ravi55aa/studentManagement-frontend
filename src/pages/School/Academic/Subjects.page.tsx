import { useEffect, useState } from "react";
import { Pencil, Trash2, Bell } from "lucide-react";
import {Link} from "react-router";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import { useAppSelector,useAppDispatch } from "@/hooks/useStoreHooks";
import {storeSchoolAcademicSubjects,toggleAcademicSubLoading } from "@/utils/Redux/Reducer/subjectReducer";
import Swal from "sweetalert2";




const SubjectsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch=useAppDispatch();
    const subjectStore=useAppSelector((state)=>state.schoolSubject);

    /* ---------- Filtering ---------- */
    // const filteredSubjects = DUMMY_SUBJECTS.filter(
    //     (subject) =>
    //     subject.name.toLowerCase().includes(search.toLowerCase()) ||
    //     subject.code.toLowerCase().includes(search.toLowerCase())
    // );


    
    useEffect(()=>{
        (async()=>{
            const config:HandleApiOptions<null>={
                        method:"get",
                        endPoint:"/school/academic/subjects",
                        payload:null,
                        headers:{role:"school"}
                }

            const fetchData= await handleApi<null,null>(config);
            dispatch(storeSchoolAcademicSubjects(fetchData.data?.data||[]));
        })()
    },[]);


    const handleDelete = async(id: string) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
        });

        if(!result.isConfirmed){
            return;
        }
        
        const config:HandleApiOptions<null>={
                    method:"delete",
                    endPoint:`/school/academic/subjects/${id}`,
                    payload:null,
                    headers:{role:"school"}
                }

        const deletedDoc = await handleApi<null,null>(config);
        
        if(deletedDoc.success){
            Swal.fire("Deleted!", "Item deleted successfully", "success");
        }
        
        dispatch(toggleAcademicSubLoading());
        return true;
    };



    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <Link to="add">
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800">
            Add New
            </button>
            </Link>

            <Bell className="text-green-700 w-5 h-5" />
        </div>

        {/* Filter + Search */}
        <div className="flex gap-3 mb-6">
            <button className="border px-3 py-2 rounded-md text-sm bg-gray-100">
            Add Filter ▼
            </button>

            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subjects"
            className="flex-1 border px-4 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
        </div>

        {/* ---------- Table ---------- */}
        <div className="border rounded-md overflow-x-auto">
            <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
                <tr>
                <th className="px-4 py-2 text-left">Subject Name</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Marks</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {subjectStore.loading ? 
                
            <tr><td>
                    "Loading..." 
                </td></tr> 
                
            :
                subjectStore.subjects?.length === 0 ? (
                <tr>
                    <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500"
                    >
                    No subjects found
                    </td>
                </tr>
                ) : (
                subjectStore.subjects?.map((subject, index) => (
                    <tr
                    key={subject._id}
                    className={`border-t ${
                        index % 2 === 1 ? "bg-green-100" : ""
                    }`}
                    >
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                        <span>{subject.name}</span>
                        {/* {subject.status === "active" && (
                            <span className="text-xs text-green-700 font-medium">
                            Active
                            </span>
                        )} */}
                        </div>
                    </td>

                    <td className="px-4 py-3">{subject.code}</td>
                    <td className="px-4 py-3">{subject.className}</td>
                    <td className="px-4 py-3 capitalize">
                        {subject.type}
                    </td>
                    <td className="px-4 py-3">
                        {subject.passMarks} / {subject.maxMarks}
                    </td>
                    <td className="px-4 py-3 capitalize">
                        {subject.department}
                    </td>

                    <td className="px-4 py-3">
                        <div className="flex justify-center gap-3 text-gray-600">
                        <Link to={`edit/${subject._id}`}>
                            <Pencil
                                className="w-4 h-4 cursor-pointer hover:text-green-700"
                            />
                        </Link>
                        <Trash2
                            className="w-4 h-4 cursor-pointer hover:text-red-600"
                            onClick={() => handleDelete(subject._id)}
                        />
                        </div>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10 text-sm text-gray-600">
            <button className="text-gray-400">⬅</button>
            <span className="text-green-700 font-medium">
            Page 1 of 1
            </span>
            <button className="text-green-700">➡</button>
        </div>
        </div>
    );
};

export default SubjectsPage;



