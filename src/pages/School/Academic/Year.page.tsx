import { useEffect } from "react";
import { Pencil, Trash2, Bell } from "lucide-react";
import {Link} from "react-router";
import { useAppDispatch,useAppSelector } from "@/hooks/useStoreHooks";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import Swal from "sweetalert2";
import { YearRoute } from "@/constants/routes.contants";
import { 
    storeSchoolAcademicYears, 
    toggleAcademicLoading 
} from "@/utils/Redux/Reducer/schoolYearReducer";
import { Pagination } from "@/components";
import { TableComponent } from "@/components/Table.compo";
import SearchAndFilter from "@/components/SearchAndFilter";



const AcademicYearsPage = () => {
    //const [search, setSearch] = useState("");
    //const [error, setError] = useState("");
    
    const dispatch=useAppDispatch();
    const {years,loading}=useAppSelector((state)=>state.schoolYear);


    useEffect(()=>{
            (async()=>{
                const config:HandleApiOptions<null>={
                            method:"get",
                            endPoint:YearRoute.get,
                            payload:null,
                            headers:{role:"school"}
                    }

                const fetchData= await handleApi<null,null>(config);
                dispatch(storeSchoolAcademicYears(fetchData.data.data));
                
            })()
        },[dispatch])


    /* ---------- Filtering ---------- */
    // const filteredYears =years.filter(
    //     (year) =>
    //     year?.year?.includes(search) ||
    //     year?.code?.toLowerCase().includes(search.toLowerCase())
    // );


    /* ---------- Handlers ---------- */
    const handleDelete = async(id: string) => {

        dispatch(toggleAcademicLoading(true));

        const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "This action cannot be undone!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it",
                });
        
        if(!result.isConfirmed){
            dispatch(toggleAcademicLoading(false));
            return;
        }

        const config:HandleApiOptions<null>={
                        method:"delete",
                        endPoint:`${YearRoute.get}/${id}`,
                        payload:null,
                        headers:{role:"school"}
                    }

        const deletedDoc = await handleApi<null,null>(config);
        
        if(deletedDoc.success){
            // Swal.fire("Deleted!", "Item deleted successfully.", "success");
            
        }
        dispatch(toggleAcademicLoading(false));
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

        <SearchAndFilter/>

        <TableComponent
            data={ years ?? []}
            keyField="code"
            loading={loading}
            emptyMessage="No teachers found"
            columns={[
                {header: "Academic Year", accessor:'year'},
                { header: "Code", accessor: "code" },
                { header: "Start Date", accessor: "startDate",format:(value:string)=>value.slice(0,10) },
                { header: "End Date", accessor: "endDate",format:(value:string)=>value.slice(0,10) },
                {
                header: "Actions",
                align: "center",
                render: (year) => (
                    <div className="flex justify-center gap-3">
                    <Link to={`edit/${year._id}`}>
                    <Pencil
                        className="w-4 h-4 cursor-pointer hover:text-green-700"
                    /></Link>
                    <Trash2
                        className="w-4 h-4 cursor-pointer hover:text-red-600"
                        onClick={() => handleDelete(year._id)}
                    />
                    </div>
                ),
                },
            ]}
            />

        <Pagination/>
        </div>
    );
};

export default AcademicYearsPage;