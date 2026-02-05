import { Eye, Pencil, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const teachers = [
    {
        id: "1",
        name: "Kristin Watson",
        facultyNo: "1001",
        phone: "9878675645",
        email: "michelle.rivera@example.com",
        gender: "Male",
        avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
        id: "2",
        name: "Marvin McKinney",
        facultyNo: "1051",
        phone: "9878675645",
        email: "debbie.baker@example.com",
        gender: "Male",
        avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
        id: "3",
        name: "Jane Cooper",
        facultyNo: "1034",
        phone: "9878675645",
        email: "kenzi.lawson@example.com",
        gender: "Female",
        avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
        id: "4",
        name: "Cody Fisher",
        facultyNo: "1065",
        phone: "9878675645",
        email: "nathan.roberts@example.com",
        gender: "Male",
        avatar: "https://i.pravatar.cc/40?img=4",
    },
    ];



const TeachersListPage = () => {
    return (
        <div className="p-6 bg-white min-h-screen">

        {/* ===== Top Bar ===== */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
                Export CSV
            </button>

            <Link
                to="add"
                className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800"
            >
                Add Teacher
            </Link>
            </div>

            <Bell className="w-5 h-5 text-green-700 cursor-pointer" />
        </div>

        {/* ===== Filter + Search ===== */}
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

        {/* ===== Table ===== */}
        <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
            <thead className="border-b bg-white">
                <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Faculty Number</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Gender</th>
                <th className="text-center px-4 py-2">Actions</th>
                </tr>
            </thead>

            <tbody>
                {teachers.map((teacher, index) => (
                <tr
                    key={teacher.id}
                    className={`border-t ${
                    index % 2 === 1 ? "bg-green-50" : ""
                    }`}
                >
                    <td className="px-4 py-3 flex items-center gap-3">
                    <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    {teacher.name}
                    </td>

                    <td className="px-4 py-3">{teacher.facultyNo}</td>
                    <td className="px-4 py-3">{teacher.phone}</td>
                    <td className="px-4 py-3">{teacher.email}</td>
                    <td className="px-4 py-3">{teacher.gender}</td>

                    <td className="px-4 py-3">
                    <div className="flex justify-center gap-4 text-gray-600">
                        <Link to={`view/${teacher.id}`}>
                        <Eye className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>

                        <Link to={`edit/${teacher.id}`}>
                        <Pencil className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* ===== Pagination ===== */}
        <div className="flex justify-center items-center gap-4 mt-8 text-sm">
            <button className="text-gray-400">◀</button>
            <span className="text-green-700 font-medium">Page 1 of 1</span>
            <button className="text-green-700">▶</button>
        </div>
        </div>
    );
};

export default TeachersListPage;


