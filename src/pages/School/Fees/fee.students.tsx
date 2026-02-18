
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeesListPage() {

    const [search, setSearch] = useState("");
    const navigate=useNavigate();


    const feesData = [
        {
        name: "Kevin Watson",
        class: "6 A",
        center: "Dubai - 01",
        program: "K - 12",
        feeDetails: "Tuition Fee - July 2025",
        amount: 1500,
        status: "Pending",
        },
        {
        name: "Marvin McKinney",
        class: "10 A",
        center: "Dubai - 01",
        program: "K - 12",
        feeDetails: "Tuition Fee - July 2025",
        amount: 1500,
        status: "Paid",
        },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
            <button onClick={()=>navigate("add")} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">
            Add New
            </button>
        </div>

        {/* Filter + Search */}
        <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 border rounded-md text-sm bg-white">
            Add Filter
            </button>

            <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2 text-sm"
            />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">

                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Center</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">Fees Details</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>

                </tr>
            </thead>

            <tbody>
                {feesData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">

                    <td className="px-6 py-4 font-medium">
                    {item.name}
                    </td>

                    <td className="px-6 py-4">
                    {item.class}
                    </td>

                    <td className="px-6 py-4">
                    {item.center}
                    </td>

                    <td className="px-6 py-4">
                    {item.program}
                    </td>

                    <td className="px-6 py-4">
                    {item.feeDetails}
                    </td>

                    <td className="px-6 py-4 font-medium">
                    ₹ {item.amount}
                    </td>

                    <td className="px-6 py-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"}`}
                    >
                        {item.status}
                    </span>
                    </td>

                    <td className="px-6 py-4">
                    {item.status === "Paid" ? (
                        <button className="text-xs px-3 py-1 bg-gray-200 rounded-md">
                        Mark as Not Paid
                        </button>
                    ) : (
                        <button className="text-xs px-3 py-1 bg-green-600 text-white rounded-md">
                        Mark as Paid
                        </button>
                    )}
                    </td>

                </tr>
                ))}
            </tbody>

            </table>

        </div>

        {/* Pagination */}
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

        </div>
    );
}
