// import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

import Sidebar from "../../components/Sidebar.page";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">

        <aside>
        {/* SIDEBAR */}
        <Sidebar/>
        </aside>

        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        {/* MAIN CONTENT */}
        <Outlet/>
        </main>

        </div>
    );
}


