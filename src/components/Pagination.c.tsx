
export default function Pagination(){
    return(
        <div className="flex justify-center items-center gap-4 mt-6 text-sm">
            <button className="px-3 py-1 border rounded-md">
            ←
            </button>
            <span>
            Page 1 of 1
            </span>
            <button className="px-3 py-1 border rounded-md">
            →
            </button>
        </div>
    )
}