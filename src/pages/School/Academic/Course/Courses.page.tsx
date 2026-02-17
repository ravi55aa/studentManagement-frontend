import { Pencil, Ban, Trash2, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import {IAcademicCourse,IAcademicCourseMeta} from "@/interfaces/ISchool.ts"
import { storeSchoolAcademicCourses, storeSchoolAcademicCoursesMeta, toggleAcademicCourseLoading } from "@/utils/Redux/Reducer/courses.reducer";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import Swal from "sweetalert2";



const CourseListPage = () => {

    // const [form, setForm] = useState({
    //     name: "",
    //         program: "",
    //             code: "",
    //                 duration: "",
    // });

    const dispatch=useAppDispatch();
    const {courses,courses_meta}=useAppSelector((state)=>state.courses);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    //const [courses, setCourses] = useState(dummy_courses);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    //UseEffect Fetches Courses from Backend
    useEffect(() => {
    const fetchCourses = async () => {
        try {
        setLoading(true);

        const config:HandleApiOptions<null> = {
            method: "get",
            endPoint: "/school/academic/courses",
            payload:null,
            headers: { role: "school" },
        };

        type fetchedApiDataType={courses:IAcademicCourse[],courses_meta:IAcademicCourseMeta[]}
        const res = await handleApi<null,fetchedApiDataType>(config);

        if (!res.success) {
            throw new Error(res.error.message);
        }

        const {courses,courses_meta}=res.data.data;
        dispatch(storeSchoolAcademicCourses(courses))
        dispatch(storeSchoolAcademicCoursesMeta(courses_meta));

            setError(null);
        } catch (err) {
            setError(err || "Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    fetchCourses();
    }, [search, filter]);




    // const handleChange = (
    //     e: React.ChangeEvent< HTMLSelectElement>
    //     ) => {
    //     const { name, value } = e.target;

    //     setForm((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };


    /******************* Handlers ****/
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

/*
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // basic validation
            if (!form.name || !form.code || !form.program) {
            setError("Please fill all required fields");
            return;
            }

            const config = {
                method: "post",
                endPoint: "/school/academics/courses/add",
                payload: form,
                headers: { role: "school" },
            };

            const res = await handleApi(config);

            if (!res.success) {
            throw new Error(res.error.message);
            }

            setForm({
            name: "",
            program: "",
            code: "",
            duration: "",
            });

            setError(null);

            // refresh list
            //setCourses((prev) => [res.data.data, ...prev]);
        } catch (err) {
            setError(err.message || "Unable to save course");
        } finally {
            setLoading(false);
        }
    };


    ui-display courses filteredOne
    const filteredCourses = courses?.filter((course) => {
        const matchesSearch =
            course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase());

        const matchesFilter = filter ? course?.code === filter : true;

        return matchesSearch && matchesFilter;
    });
*/


    //   HandleDelete */
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
                        endPoint:`/school/academic/courses/${id}`,
                        payload:null,
                        headers:{role:"school"}
                    }
    
            const deletedDoc = await handleApi<null,null>(config);
            
            if(deletedDoc.success){
                Swal.fire("Deleted!", "Item deleted successfully", "success");
            }
            
            dispatch(toggleAcademicCourseLoading());
            return true;
        };


    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
            <Link to="add">
                <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
                Add New
                </button>
            </Link>

            <Bell className="w-5 h-5 text-green-700 cursor-pointer" />
        </div>

        {/* Filter + Search */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
            <select onChange={handleFilterChange} className="border px-3 py-2 rounded-md text-sm w-40">
            <option>Add Filter</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Computer Science</option>
            <option>Languages</option>
            <option>Other</option>
            </select>

            <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search"
            className="flex-1 border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-700 outline-none"
            />
        </div>
        {error && <p className="text-sm text-red-500 errorDispaly">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
            <thead className="bg-white border-b">
                <tr>
                <th className="text-left px-4 py-2">Course</th>
                <th className="text-left px-4 py-2">Code</th>
                <th className="text-left px-4 py-2">Total Students</th>
                <th className="text-left px-4 py-2">Duration</th>
                <th className="text-center px-4 py-2">Actions</th>
                </tr>
            </thead>

{!loading &&
            <tbody>
                {courses?.map((course, index) => (
                <tr
                    key={course?._id}
                    className={`border-t ${
                    index % 2 === 1 ? "bg-green-50" : ""
                    }`}
                >
                    <td className="px-4 py-3">{course?.name}</td>
                    <td className="px-4 py-3">{course?.code}</td>
                    <td className="px-4 py-3">{courses_meta[index].maxStudents}</td>
                    <td className="px-4 py-3">{course?.duration.value +" "+course?.duration.unit }</td>

                    <td className="px-4 py-3">
                    <div className="flex justify-center gap-3 text-gray-600">
                        <Link to={`edit/${course._id}`}>
                        <Pencil className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>

                        <Ban className="w-4 h-4 hover:text-yellow-600 cursor-pointer" />

                        <Trash2 
                        onClick={()=>handleDelete(course?._id)} className="w-4 h-4 hover:text-red-600 cursor-pointer" />
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>}
            </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8 text-sm">
            <button className="text-gray-400">◀</button>
            <span className="text-green-700 font-medium">Page 1 of 1</span>
            <button className="text-green-700">▶</button>
        </div>
        </div>
    );
};

export default CourseListPage;
