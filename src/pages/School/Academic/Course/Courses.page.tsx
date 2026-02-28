import { Pencil, Ban, Trash2, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import {IAcademicCourse,IAcademicCourseMeta} from "@/interfaces/ISchool.ts"
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import Swal from "sweetalert2";
import { CourseRoute } from "@/constants/routes.contants";
import { 
    storeSchoolAcademicCourses, 
    storeSchoolAcademicCoursesMeta, 
    toggleAcademicCourseLoading 
} from "@/utils/Redux/Reducer/courses.reducer";
import { Pagination } from "@/components";
import SearchAndFilter from "@/components/SearchAndFilter";
import { TableComponent } from "@/components/Table.compo";



const CourseListPage = () => {

    const dispatch=useAppDispatch();
    const {courses}=useAppSelector((state)=>state.courses);

    // const [search, setSearch] = useState("");
    // const [filter, setFilter] = useState("");
    //const [courses, setCourses] = useState(dummy_courses);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    //Fetches Courses from Backend
    useEffect(() => {
    const fetchCourses = async () => {
        try {
        setLoading(true);

        const config:HandleApiOptions<null> = {
            method: "get",
            endPoint: CourseRoute.get,
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
    }, [dispatch]);


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
                        endPoint:`${CourseRoute.get}/${id}`,
                        payload:null,
                        headers:{role:"school"}
                    }
    
            const deletedDoc = await handleApi<null,null>(config);
            
            if(deletedDoc.success){
                Swal.fire("Deleted!", "Item deleted successfully", "success");
            }
            console.log(error);
            
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

        <SearchAndFilter/>

        
        <TableComponent
            data={courses ?? []}
            keyField="_id"
            loading={loading}
            emptyMessage="No teachers found"
            columns={[
                {
                header: "Name",accessor:'name'},
                { header: "Code", accessor: "code" },
                { header: "duration", accessor: "duration",format:(value:{value:string,unit:string})=>value?.value+" "+value?.unit },
                {
                header: "Actions",
                align: "center",
                render: (course) => (
                    <div className="flex justify-center gap-3">
                        <Link to={`edit/${course._id}`}>
                        <Pencil className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>

                        <Ban className="w-4 h-4 hover:text-yellow-600 cursor-pointer" />

                        <Trash2 
                        onClick={()=>handleDelete(course?._id)} className="w-4 h-4 hover:text-red-600 cursor-pointer" />
                    </div>
                ),
                },
            ]}
            />

        <Pagination/>
        
        </div>
    );
};

export default CourseListPage;



























    // const handleChange = (
    //     e: React.ChangeEvent< HTMLSelectElement>
    //     ) => {
    //     const { name, value } = e.target;

    //     setForm((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };


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



const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

*/


