
import { Section } from "@/components/Teacher/Section";
import StatusBadge from "@/components/fee/StatusBadge.c";
import TypeBadge from "@/components/fee/TypeBadge.c";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { IFee } from "@/interfaces/IFee";
import { useAppSelector,useAppDispatch } from "@/hooks/useStoreHooks";
import { storeFees,toggleFeeLoading } from "@/utils/Redux/Reducer/fee.reducer";
import { Pagination,TopBar } from "@/components";
import { toast } from "react-toastify";


export default function FeeListPage() {

    const dispatch = useAppDispatch();
    const feeStore = useAppSelector((state)=>state.fees);


    useEffect(()=>{
            (async()=>{
                
                dispatch(toggleFeeLoading(true))
                const config:HandleApiOptions<null>={
                            method:"get",
                            endPoint:"/fee/get-all",
                            payload:null,
                            headers:{role:"School"}
                    }
    
                const res= await handleApi<null,IFee[]>(config);

                if(!res.success){
                    console.log("@fees.tsx res.error",res.error);
                    return res.success
                }
                dispatch(toggleFeeLoading(false));
                dispatch(storeFees(res.data.data));
            })()
    },[dispatch]);



    const handleDelete=async(id:string)=>{

        dispatch(toggleFeeLoading(true));
        const config:HandleApiOptions<null>={
                method:"delete",
                endPoint:`/fee/delete/${id}`,
                payload:null,
                headers:{role:"School"}
            }

        const res= await handleApi<null,IFee[]>(config);

        if(!res.success){
            console.log("@fees.tsx res.error",res.error);
            return res.success
        }
        
        dispatch(toggleFeeLoading(false));
        toast.success("Fee Deleted Successfully");
    };



    return (
        <div className="p-8 bg-white-100 min-h-screen">
            <TopBar to="add" />

        <Section title="All Fees">

            <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">

                <thead>
                <tr className="bg-gray-100 text-sm text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Applies To</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                </tr>
                </thead>

                <tbody>
                {feeStore.fees?.length === 0 ? (
                    <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                        No Fees Found
                    </td>
                    </tr>
                ) : (
                    feeStore.fees?.map((fee) => (
                    <tr key={fee._id} className="border-t text-sm">

                        <td className="p-3 font-medium">
                        {fee?.name}
                        </td>

                        <td className="p-3 text-gray-600">
                        {fee?.code}
                        </td>

                        <td className="p-3">
                        <TypeBadge type={fee?.type} />
                        </td>

                        <td className="p-3">
                        {fee?.appliesTo.model}
                        </td>

                        <td className="p-3">
                        {fee?.currency} {fee?.totalAmount}
                        </td>

                        <td className="p-3">
                        {new Date(fee?.dueDate).toLocaleDateString()}
                        </td>

                        <td className="p-3">
                        <StatusBadge status={fee?.status} />
                        </td>

                        <td className="p-3 flex justify-end text-right space-x-2">

                        <Link to={`/fee/edit/${fee?._id}`}>
                        <Pencil className="w-4 h-4 text-green-600 hover:text-green-800 hover:underline cursor-pointer" />
                        </Link>

                        <Trash2
                        className="w-4 h-4 text-red-600 hover:text-red-800  hover:underline cursor-pointer"
                        onClick={() => handleDelete(fee?._id)}
                        />

                        </td>

                    </tr>
                    ))
                )}
                </tbody>

            </table>
            </div>

        </Section>

        <Pagination/>

        </div>
    );
}
