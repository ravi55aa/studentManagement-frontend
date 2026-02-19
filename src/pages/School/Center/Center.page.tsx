import { useState,useEffect } from "react";
import {
    Pencil,
    Ban,
    Trash2,
    Bell
} from "lucide-react";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { setCenters,toggleCenterLoading } from "@/utils/Redux/Reducer/centerReducer";
import { storeAddress } from "@/utils/Redux/Reducer/address.reducer";
import { IAddress } from "@/interfaces/IRegister";
import Swal from "sweetalert2";
import { deleteSwal } from "@/utils/swal";
//import { useAppNavigate } from "@/hooks/navigate.hook";


const CentersPage = () => {

    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);

    
    const dispatch=useAppDispatch();
    const centerReduxStore=useAppSelector((store)=>store.center);
    const addressReduxStore=useAppSelector((store)=>store.address);


    useEffect(()=>{
        (async()=>{
            //All Centers fetch
            const config:HandleApiOptions<null>={
                        method:"get",
                        endPoint:"/school/centers",
                        payload:null,
                        headers:{role:"school"}
                }

            const fetchAllCenters= await handleApi<null,null>(config);
            
            //All addresses fetch
            const config2:HandleApiOptions<null>={
                method:"get",
                endPoint:"/address/all",
                payload:null,
                headers:{role:"school"}
            }
            
            const fetchedAllAddress= await handleApi<null,IAddress[]>(config2);
            dispatch(storeAddress(fetchedAllAddress?.data?.data));
            dispatch(setCenters(fetchAllCenters.data.data));

            setError("");
        })()
    },[]);



    /* ---------- Search Handling ---------- */
    const filteredCenters = centerReduxStore?.centers?.filter((center) =>
        center?.name.toLowerCase().includes(search.toLowerCase()) ||
        center?.code.toLowerCase().includes(search.toLowerCase())
    );

    // const filteredAddress=addressReduxStore?.addresses?.filter((address)=>
    //     filteredCenters?.forEach((centers)=>centers._id==address.userId)
    // );

    /* ---------- Action Handlers ---------- */

    const handleDisable = (id: string) => {
        console.log("Disable center:", id);
    };

    const handleDelete = async(id: string) => {

        const result = await deleteSwal();

        if (!result.isConfirmed) return;

        const config:HandleApiOptions<null>={
                        method:"delete",
                        endPoint:`/school/centers/${id}`,
                        payload:null,
                        headers:{role:"school"}
                }

        const res= await handleApi<null,null>(config);

        if(!res.success) return res.success;
        
        Swal.fire("Deleted!", "Item deleted successfully", "success");
        dispatch(toggleCenterLoading());

        return res.success;
    };

    const getAddressById = (id: string) => {
        console.log(id);
        const address=addressReduxStore?.addresses?.filter(
            (addr) =>addr.userId === id
        ); 

        console.log(address);

        return address;
    };




    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <button type="button" className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800">
            <Link to="add"> Add New </Link>
            </button>

            <Bell className="text-green-700 w-5 h-5" />
        </div>

        {/* Search */}
        <div className="mb-6">
            <input
            type="text"
            placeholder="Search centers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border px-4 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
        </div>

        {/* Error */}
        {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* ---------- Desktop Table ---------- */}
        <div className="hidden md:block overflow-x-auto border rounded-md">
            <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
                <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">City, Country</th>
                <th className="px-4 py-2 text-left">No of Students</th>
                <th className="px-4 py-2 text-left">Strength</th>
                <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
        {centerReduxStore?.loading ? (
            <tr>
            <td colSpan={5} className="text-center py-6">
                Loading... (If continues kindly re-login)
            </td>
            </tr>
        ) : filteredCenters?.length === 0 ? (
            <tr>
            <td colSpan={5} className="text-center py-6 text-gray-500">
                No centers found
            </td>
            </tr>
        ) : (
            filteredCenters.map((center, index) => (
            <tr
                key={center._id}
                className={`border-t ${index % 2 === 1 ? "bg-green-50" : ""}`}
            >
                <td className="px-4 py-3">{center.name}</td>
                <td className="px-4 py-3">{center.code}</td>
                <td className="px-4 py-3">
                {
                    getAddressById(center._id)[0]?.city 
                    +", "+ 
                    getAddressById(center._id)[0]?.country
                }
                </td>
                <td className="px-4 py-3">{center?.currentStrength}</td>
                <td className="px-4 py-3">{center?.totalCapacity}</td>
                <td className="px-4 py-3">
                <div className="flex justify-center gap-3">
                    <Link to={`edit/${center._id}`}>
                    <Pencil className="w-4 h-4 hover:text-green-700" />
                    </Link>
                    <Ban
                    className="w-4 h-4 hover:text-yellow-600 cursor-pointer"
                    onClick={() => handleDisable(center._id)}
                    />
                    <Trash2
                    className="w-4 h-4 hover:text-red-600 cursor-pointer"
                    onClick={() => handleDelete(center._id)}
                    />
                </div>
                </td>
            </tr>
            ))
        )}
        </tbody>


            </table>
        </div>

        {/* ---------- Mobile Card View ---------- */}
        <div className="md:hidden space-y-4">
            {filteredCenters?.length === 0 ? (
            <p className="text-center text-gray-500">
                No centers found
            </p>
            ) : (
            filteredCenters?.map((center,index) => (
                <div
                key={index}
                className="border rounded-md p-4 shadow-sm"
                >
                <div className="font-medium">{center?.name}</div>
                <div className="text-sm text-gray-600">
                    {center?.code}1fdsfds
                </div>
                <div className="text-sm">
                    {center.code}, {center?.code}2fdd
                </div>
                <div className="text-sm mb-3">
                    Currency: {center?.code}3safd
                </div>

                <div className="flex gap-4 text-gray-600">
                    <Link to="edit/:id">
                    <Pencil
                    className="w-4 h-4"
                    />
                    </Link>
                    <Ban
                    className="w-4 h-4"
                    onClick={() => handleDisable(center?._id)}
                    />
                    <Trash2
                    className="w-4 h-4"
                    onClick={() => handleDelete(center?._id)}
                    />
                </div>
                </div>
            ))
            )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10 text-sm text-gray-600">
            <button className="text-gray-400">⬅</button>
            <span>Page 1 of 1</span>
            <button className="text-green-700">➡</button>
        </div>

        </div>
    );
};

export default CentersPage;

