import {  useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {Link} from "react-router";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { storeBatches } from "@/utils/Redux/Reducer/batchReducer";
import { IBatches } from "@/interfaces/ISchool";


const BatchesPage = () => {
    const [search, setSearch] = useState("");
    const dispatch=useAppDispatch();
    const batchReduxStore=useAppSelector((state)=>state.batch);
    // const centerReduxStore=useAppSelector((state)=>state.center);


    useEffect(()=>{
        (async()=>{
            const config:HandleApiOptions<null>={
                        method:"get",
                        endPoint:"/school/batches",
                        payload:null,
                        headers:{role:"school"}
                }

            const fetchData= await handleApi<null,null>(config);
            dispatch(storeBatches(fetchData.data.data));
        })();
    },[])
    

    /* ---------- Filtering ---------- */
    const filteredBatches = batchReduxStore?.batches?.filter(
        (batch:IBatches) =>
        batch.name.toLowerCase().includes(search.toLowerCase()) ||
        batch.code.toLowerCase().includes(search.toLowerCase())
    );

    /* ---------- Action Handlers ---------- */
    // const handleEnrollStudents = (id: string) =>
    //     console.log("Enroll students:", id);

    // const handleAssignTeachers = (id: string) =>
    //     console.log("Assign teachers:", id);

    // const handlePromoteStudents = (id: string) =>
    //     console.log("Promote students:", id);


    return (
        <div className="p-6 bg-[#fbf3f1] min-h-screen">

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

        {/* Filter + Search */}
        <div className="flex gap-3 mb-6">
            <button className="border px-3 py-2 rounded-md text-sm bg-white">
            Add Filter ▼
            </button>
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 border px-4 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
        </div>

        {/* ---------- Desktop Table ---------- */}
        <div className="hidden lg:block bg-white border rounded-md overflow-x-auto">
            <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
                <tr>
                <th className="px-4 py-2 text-left">Name</th>
                {/* <th className="px-4 py-2 text-left">Center</th> */}
                <th className="px-4 py-2 text-left">Batch Counselor</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {filteredBatches.map((batch, index) => (
                <tr
                    key={index}
                    className={`border-t ${
                    index % 2 === 1 ? "bg-green-100" : ""
                    }`}
                >
                    <td className="px-4 py-3">{batch?.name}</td>
                    {/* <td className="px-4 py-3">{batch?.center && batch?.center.name}</td> */}
                    <td className="px-4 py-3">Murali Manohar</td>
                    <td className="px-4 py-3">{batch?.code}</td>
                    <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-center gap-2">
                        <ActionBtn label="Enroll" path={`edit/:${batch?._id}`}  />
                        <ActionBtn label="Assign" path={`edit/:${batch?._id}`} />
                        <ActionBtn label="Promote" path={`edit/:${batch?._id}`} />
                        <ActionBtn label="Edit" path={`edit/${batch?._id}`} />
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10 text-sm">
            <span className="text-gray-500">⬅</span>
            <span className="text-green-700 font-medium">
            Page 1 of 1
            </span>
            <span className="text-green-700">➡</span>
        </div>
        </div>
    );
    };

    /* ---------- Reusable Action Button ---------- */
    const ActionBtn = ({
    label,
    path,
    }: {
    path:string;
    label: string;
    }) => (
    <Link to={path}>
    <button
        className="px-3 py-1 rounded-md bg-gray-200 text-xs hover:bg-gray-300"
    >
        {label}
    </button>
    </Link>
);

export default BatchesPage;
