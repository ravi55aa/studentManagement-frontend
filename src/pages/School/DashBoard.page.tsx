// import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

import { schoolSidebarLinks } from '@/constants/sidebar';
import Sidebar from '../../components/Sidebar.page';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="w-64 bg-white border-r h-full overflow-x-hidden scroll-m-0 overflow-y-clip sticky top-0">
        <Sidebar sidebarFields={schoolSidebarLinks} mainPath='/school/dashboard/' />
      </aside>

      <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        {/* MAIN CONTENT */}
        <Outlet />
      </main>
    </div>
  );
}
