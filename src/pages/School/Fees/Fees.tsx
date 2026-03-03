
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";

import { useAppSelector,useAppDispatch } from "@/hooks/useStoreHooks";
import { storeFees,toggleFeeLoading } from "@/utils/Redux/Reducer/fee.reducer";
import { Pagination,TopBar } from "@/components";
import { toast } from "react-toastify";
import { deleteSwal } from "@/utils/swal";
import SearchAndFilter from "@/components/SearchAndFilter";
import { TableComponent } from "@/components/Table.compo";
import TypeBadge from "@/components/fee/TypeBadge.c";
import StatusBadge from "@/components/fee/StatusBadge.c";
import { FeeService } from "@/api/Services/fee.service";




export default function FeeListPage() {

    const dispatch = useAppDispatch();
    const feeStore = useAppSelector((state)=>state.fees);
    const navigate=useNavigate();

    const handleGetAllFess=async()=>{
        dispatch(toggleFeeLoading(true))

        const res= await FeeService.getAll();
    
        if(!res.success){
            toast.error(res.error.message);
            return res.success
        }
        dispatch(toggleFeeLoading(false));
        dispatch(storeFees(res.data?.data.reverse()));
    }

    useEffect(()=>{
            (async()=>{
                handleGetAllFess();
            })();
    },[]);


    const handleDelete=async(id:string)=>{

        const result = await deleteSwal();
        if(!result.isConfirmed) return result.isConfirmed;

        dispatch(toggleFeeLoading(true));

        const res= await FeeService.delete(id)

        if(!res.success){
            toast.warn(res.error.message);
            return res.success
        }

        dispatch(toggleFeeLoading(false));
        
        await handleGetAllFess();
        toast.success("Fee Deleted Successfully");
        return res.success;
    };



    return (
        <div className="p-8 bg-white-100 min-h-screen">
            <div className="flex justify-end ">
                <button onClick={()=>navigate("students")} className=" mr-2 bg-green-600 text-white px-4 max-h-9 rounded-md text-sm">
                    Watch Students
                </button>
                <TopBar to="add" />
            </div>
        
        <SearchAndFilter/>

            <TableComponent
                        data={feeStore?.fees ?? []}
                        keyField="_id"
                        loading={feeStore?.loading}
                        emptyMessage="No teachers found"
                        columns={[
                            {
                            header: "Name",accessor:'name'},
                            { header: "Code", accessor: "code" },
                            { header: "Type", accessor: "type",render:(row)=><TypeBadge type={row?.type} /> },
                        
                            { header: "Total Amount", accessor: "totalAmount",format:(value:string)=>value+' ₹' },
                            { header: "Status", accessor: "status",render:(row)=> <StatusBadge status={row?.status} />},
                            {
                            header: "Actions",
                            align: "center",
                            render: (fee) => (
                                <div className="flex justify-center gap-3">
                                <Link to={`/school/dashboard/fees/edit/${fee?._id}`}>
                                    <Pencil className="w-4 h-4 text-green-600 hover:text-green-800 hover:underline cursor-pointer" />
                                    </Link>

                                    <Trash2
                                    className="w-4 h-4 text-red-600 hover:text-red-800  hover:underline cursor-pointer"
                                    onClick={() => handleDelete(fee?._id)}
                                    />
                                </div>
                            ),
                            },
                        ]}
                        />

        <Pagination/>

        </div>
    );
}
