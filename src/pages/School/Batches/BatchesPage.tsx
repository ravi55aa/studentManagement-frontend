import {  useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {Link} from "react-router";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { storeBatches, toggleBatchLoading } from "@/utils/Redux/Reducer/batchReducer";
import { IBatches } from "@/interfaces/ISchool";
import {  ITeacherBio } from "@/interfaces/ITeacher";
import AssignTeacherModal from "@/components/Teacher/AssignTeacherModal";
import { toast } from "react-toastify";
import { ActionBtn, Pagination } from "@/components";
import SearchAndFilter from "@/components/SearchAndFilter";
import { TableComponent } from "@/components/Table.compo";
import { BatchRoute, TeacherRoute } from "@/constants/routes.contants";


const BatchesPage = () => {
    const [search, setSearch] = useState("");
    const dispatch=useAppDispatch();
    const batchReduxStore=useAppSelector((state)=>state.batch);
    const [unAssignedTeachers,setUnAssignedTeachers]=useState<ITeacherBio[]|[]>([]);
    const teachersStore=useAppSelector((state)=>state.teacher);
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState<IBatches|null>(null);
    // const centerReduxStore=useAppSelector((state)=>state.center);

    useEffect(()=>{
        (async()=>{

            const config:HandleApiOptions<null>={
                        method:"get",
                        endPoint:BatchRoute.get,
                        payload:null,
                        headers:{role:"School"}
                }

            const fetchData= await handleApi<null,null>(config);
            dispatch(storeBatches(fetchData.data.data));
        })();
    },[dispatch,batchReduxStore.loading]);


    useEffect(()=>{
        (async()=>{
            const config:HandleApiOptions<null>={
                        method:"get",
                        endPoint:TeacherRoute.getAllUnAssigned,
                        payload:null,
                        headers:{role:"School"}
                }

            const res= await handleApi<null,ITeacherBio[]>(config);
            const teachers=res.data?.data
            setUnAssignedTeachers(teachers);
            return true;
        })();
    },[]);
    

    /* ---------- Filtering ---------- */
    const filteredBatches = batchReduxStore?.batches?.filter(
        (batch:IBatches) =>
        batch.name.toLowerCase().includes(search.toLowerCase()) ||
        batch.code.toLowerCase().includes(search.toLowerCase())
    );

    
    /* ---------- Action Handlers ---------- */
    // const handleEnrollStudents = (id: string) =>
    //     console.log("Enroll students:", id);
    
    const handleUnAssignedTeachers=async(counselor:string|ITeacherBio):Promise<boolean>=>{
        if(typeof counselor == 'string') return;

        const teacher_Professional_data = teachersStore.professional.find((teacher)=>teacher.teacherId==counselor._id);
        
        if(!teacher_Professional_data){
            toast.info('No available teachers in the center, For this batch');
        }

        const center=teacher_Professional_data.center;

        const config:HandleApiOptions<null>={
                        method:"get",
                        endPoint:TeacherRoute.getAllUnAssigned,
                        payload:null,
                        params:{center},
                        headers:{role:"School"}
                }

        const res= await handleApi<null,ITeacherBio[]>(config);
        const teachers=res.data?.data || [];
        setUnAssignedTeachers(teachers);

        return res.success;
    }

    const handleOpenAssign = async(batch: IBatches) => {
        setSelectedBatch(batch);
        await handleUnAssignedTeachers(batch.batchCounselor);
        setIsAssignOpen(true);
    };
    
    const handleAssignTeacher = async (teacherId: string):Promise<boolean> => {
        dispatch(toggleBatchLoading(true));
        const config: HandleApiOptions<object> = {
            endPoint: `${BatchRoute.assignTeacher}/${selectedBatch?._id}`,
            method: "patch",
            payload: { teacherId },
            headers: { role: "School" }
        };
        setSearch('');

        const res = await handleApi(config);

        dispatch(toggleBatchLoading(false));
        if (!res.success) {
            toast.error(res.data?.message??"Cannot assign the teacher");
            return res.success;
        }
        toast.success("New Teacher assigned successfully");
        return res.success;
    };

    // const handlePromoteStudents = (id: string) =>
    //     console.log("Promote students:", id);


    return (
        <div className="p-6 bg-[#ffffff] min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-md text-sm bg-white">
                Export CSV
            </button>
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
            <Link to="add">Add Batch</Link>
            </button>
            </div>

            <Bell className="text-green-700 w-5 h-5" />
        </div>

        <SearchAndFilter/>

        <TableComponent
            data={filteredBatches ?? []}
            keyField="adminId"
            loading={batchReduxStore?.loading}
            emptyMessage="No Batches found"
            columns={[
                {header: "Name",accessor:"name"},
                { header: "Code", accessor: "code" },
                { header: "Batch Counselor", accessor: "batchCounselor",format:(value:{firstName:string})=>value.firstName.toUpperCase() },
                { header: "Start Date", accessor: "schedule", format:(value:{startTime:string})=>value.startTime?.slice(0,10)},
                { header: "End Date", accessor: "schedule", format:(value:{endTime:string})=>value.endTime?.slice(0,10)},
                {
                header: "Actions",
                align: "center",
                render: (batch) => (
                    <div className="flex justify-center gap-3">
                    <ActionBtn label="Enroll" path={`edit/:${batch?._id}`}  />
                        <button
                            onClick={() => handleOpenAssign(batch)}
                            className="px-3 py-1 rounded-md bg-gray-200 text-xs hover:bg-gray-300"
                            >
                            Assign New Teacher
                            </button>

                        <ActionBtn label="Promote" path={`edit/:${batch?._id}`} />
                        <ActionBtn label="Edit" path={`edit/${batch?._id}`} />
                    </div>
                ),
                },
            ]}
            />


        <AssignTeacherModal
            open={isAssignOpen}
            teachers={unAssignedTeachers}
            batchId={selectedBatch?._id}
            onClose={() => setIsAssignOpen(false)}
            onAssign={handleAssignTeacher}
        />


        {/* ---------- Mobile Card View ---------- */}
        <div className="lg:hidden space-y-4">
            {filteredBatches.map((batch) => (
            <div key={batch?._id} className="bg-white border rounded-md p-4">
                <div className="font-semibold">{batch.name}</div>
                {/* <div className="text-sm text-gray-600">
                {batch.center && batch.center?.name}
                </div> */}
                <div className="text-sm">
                Counselor: Murali Manohar
                </div>
                <div className="text-sm mb-3">Code: {batch.code}</div>

                <div className="flex flex-wrap gap-2">
                <ActionBtn label="Enroll" path={`edit/:${batch?._id}`}   />
                <ActionBtn label="Assign" path={`edit/:${batch?._id}`}  />
                <ActionBtn label="Promote" path={`edit/:${batch?._id}`}  />
                <ActionBtn label="Edit" path={`edit/:${batch?._id}`}  />
                </div>
            </div>
            ))}
        </div>

        <Pagination/>
        </div>
    );
    };

export default BatchesPage;
