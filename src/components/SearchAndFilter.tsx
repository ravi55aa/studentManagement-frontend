

const SearchAndFilter = () => {
    return (
        <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <select className="border px-3 py-2 rounded-md text-sm w-40">
                    <option>Add Filter</option>
                    <option>Male</option>
                    <option>Female</option>
                    </select>
        
                    <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-700 outline-none"
                    />
        </div>
    )
}

export default SearchAndFilter