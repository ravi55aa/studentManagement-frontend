import Sidebar from '../../components/Sidebar.page';
import { Outlet } from 'react-router-dom';
import { studentSidebarLinks } from '@/constants/student.sidebar';

export default function StudentDashboard() {
    return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
        <aside className="w-64 bg-white border-r h-full overflow-x-hidden scroll-m-0 overflow-y-clip sticky top-0">
            <Sidebar sidebarFields={studentSidebarLinks} mainPath='/student/dashboard/' logoutInto='student' />
        </aside>

        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
            {/* MAIN CONTENT */}
            <Outlet />
        </main>
        </div>
    );
}
