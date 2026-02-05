import { useEffect, useState } from "react";
import { Pencil, Trash2, Bell } from "lucide-react";
import {Link} from "react-router";
import { useAppDispatch,useAppSelector } from "@/hooks/storeHooks";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import { storeSchoolAcademicYears, toggleAcademicLoading } from "@/utils/Redux/Reducer/schoolYearReducer";
import Swal from "sweetalert2";



const AcademicYearsPage = () => {
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    
    const dispatch=useAppDispatch();
    const {years,loading}=useAppSelector((state)=>state.schoolYear);


    useEffect(()=>{
            (async()=>{
                const config:HandleApiOptions<null>={
                            method:"get",
                            endPoint:"/school/academicYears",
                            payload:null,
                            headers:{role:"school"}
                    }

                const fetchData= await handleApi<null,null>(config);
                dispatch(storeSchoolAcademicYears(fetchData.data.data));
                setError("");
            })()
        },[loading])


    /* ---------- Filtering ---------- */
    const filteredYears =years.filter(
        (year) =>
        year?.year?.includes(search) ||
        year?.code?.toLowerCase().includes(search.toLowerCase())
    );


    /* ---------- Handlers ---------- */
    const handleDelete = async(id: string) => {

        dispatch(toggleAcademicLoading());

        const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "This action cannot be undone!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it",
                });
        
        if(!result.isConfirmed){
            dispatch(toggleAcademicLoading());
            return;
        }

        const config:HandleApiOptions<null>={
                        method:"delete",
                        endPoint:`/school/academicYears/${id}`,
                        payload:null,
                        headers:{role:"school"}
                    }

        const deletedDoc = await handleApi<null,null>(config);
        
        if(deletedDoc.success){
            // Swal.fire("Deleted!", "Item deleted successfully.", "success");
        }
        
        setError("");
        dispatch(toggleAcademicLoading());
        return true;
    };

    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800">
            <Link to="add">Add New</Link>
            </button>

            <Bell className="text-green-700 w-5 h-5" />
        </div>

        {error && <p>{error}</p>}

        {/* Filter + Search */}
        <div className="flex gap-3 mb-6">
            <button className="border px-3 py-2 rounded-md text-sm bg-gray-100">
            Add Filter ▼
            </button>

            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 border px-4 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
        </div>

        {/* ---------- Table ---------- */}
        <div className="border rounded-md overflow-x-auto">

            <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
                <tr>
                <th className="px-4 py-2 text-left">Academic Year</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                { loading==true ? 
                
                <tr><td>"Loading"</td></tr> 
                
                :
                
                filteredYears.length === 0 ? (
                <tr>
                    <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                    >
                    No academic years found
                    </td>
                </tr>
                ) : (
                filteredYears?.map((year, index) => (
                    <tr
                    key={index}
                    className={`border-t ${
                        index % 2 === 1 ? "bg-green-100" : ""
                    }`}
                    >
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                        <span>{year?.year}</span>
                        {year?.status=="active" && (
                            <span className="text-xs text-green-700 font-medium">
                            Active
                            </span>
                        )}
                        </div>
                    </td>

                    <td className="px-4 py-3">{year.code}</td>
                    <td className="px-4 py-3">{year.startDate.split("T")[0]}</td>
                    <td className="px-4 py-3">{year.endDate.split("T")[0]}</td>

                    <td className="px-4 py-3">
                        <div className="flex justify-center gap-3 text-gray-600">
                        <Link to={`edit/${year._id}`}>
                        <Pencil
                            className="w-4 h-4 cursor-pointer hover:text-green-700"
                        /></Link>
                        <Trash2
                            className="w-4 h-4 cursor-pointer hover:text-red-600"
                            onClick={() => handleDelete(year._id)}
                        />
                        </div>
                    </td>
                    </tr>
                ))
                )
            }
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

export default AcademicYearsPage;

