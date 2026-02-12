import { handleApi, HandleApiOptions } from "@/api/global.api";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { IGetAllTeachers, ITeacherBio } from "@/interfaces/ITeacher";
import { Eye, Pencil, Bell } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { storeTeachers } from "@/utils/Redux/Reducer/teacher.reducer";


const TeachersListPage = () => {

    const dispatch=useAppDispatch();
    const teachersStore=useAppSelector((state)=>state.teacher);


    /**
     * USE-EFFECT
     */
    useEffect(()=>{
            (async()=>{
                const config:HandleApiOptions<null>=
                    {
                        method:"get",
                        endPoint:"/teacher/all",
                        payload:null,
                        headers:{role:"School"}
                    }

                const res=await handleApi<null,IGetAllTeachers>(config);
                
                if(!res.success){
                    toast.warn(res.data.error);
                    return;
                }

                const {teacherBio,teachersSchoolData}=res.data.data;
                const result:IGetAllTeachers={teacherBio,teachersSchoolData}
                dispatch(storeTeachers(result));


                return true;
            })();
    },[dispatch])




    /**
     * Return
     */

    return (
        <div className="p-6 bg-white min-h-screen">

        {/* ===== Top Bar ===== */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                Export CSV
            </button>

            <Link
                to="add"
                className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800"
            >
                Add Teacher
            </Link>
            </div>

            <Bell className="w-5 h-5 text-green-700 cursor-pointer" />
        </div>

        {/* ===== Filter + Search ===== */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
            <select className="border px-3 py-2 rounded-md text-sm w-40">
            <option>Add Filter</option>
            <option>Male</option>
            <option>Female</option>
            </select>

            <input
            type="text"
            placeholder="Search"
            className="flex-1 border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-700 outline-none"
            />
        </div>

        {/* ===== Table ===== */}
        <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
            <thead className="border-b bg-white">
                <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Qualification</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Gender</th>
                <th className="text-center px-4 py-2">Actions</th>
                </tr>
            </thead>

            <tbody>
                {teachersStore?.bio?.map((teacher:ITeacherBio, index:number) => (
                <tr
                    key={teacher?.email}
                    className={`border-t ${
                    index % 2 === 1 ? "bg-green-50" : ""
                    }`}
                >
                    <td className="px-4 py-3 flex items-center gap-3">
                    <img
                        src={typeof teacher?.profilePhoto=="string" && teacher?.profilePhoto}
                        alt={teacher?.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    {teacher?.firstName}
                    </td>

                    <td className="px-4 py-3">{teacher?.qualification}</td>
                    <td className="px-4 py-3">{teacher?.phone}</td>
                    <td className="px-4 py-3">{teacher?.email}</td>
                    <td className="px-4 py-3">{teacher?.gender}</td>

                    <td className="px-4 py-3">
                    <div className="flex justify-center gap-4 text-gray-600">
                        <Link to={`view/${teacher?.email}`}>
                        <Eye className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>

                        <Link to={`edit/${teacher?.email}`}>
                        <Pencil className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>


        {/* ===== Pagination ===== */}
        <div className="flex justify-center items-center gap-4 mt-8 text-sm">
            <button className="text-gray-400">◀</button>
            <span className="text-green-700 font-medium">Page 1 of 1</span>
            <button className="text-green-700">▶</button>
        </div>


        </div>
    );
};

export default TeachersListPage;


