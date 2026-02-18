import { useNavigate } from "react-router-dom"


export default function TopBar({to}:{to:string}){
    const navigate=useNavigate();

    return (
        <>
        <div className="flex justify-between items-center mb-6">
            <button onClick={()=>navigate(to)} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">
            Add New
            </button>
        </div>

            
        <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 border rounded-md text-sm bg-white">
            Add Filter
            </button>

            <input
            type="text"
            placeholder="Search"
            value=''
            className="flex-1 border rounded-md px-4 py-2 text-sm"
            />
        </div>
        </>
    )
}
