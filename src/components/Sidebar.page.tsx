import { Link } from 'react-router';
import { schoolSidebarLinks,schoolPath,SidebarItemConfig  } from '@/constants/sidebar';
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";


interface SidebarItemProps {
    item: SidebarItemConfig;
}


export function Sidebar() {
    return (
        <aside className="w-64 bg-green-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-green-800">
            <h1 className="text-xl font-semibold">MyEdu</h1>
            <p className="text-sm opacity-80 mt-1">
            Read About MyEdu
            </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 px-4 space-y-2">
            {schoolSidebarLinks.map((item) => (
            <SidebarItem key={item.label} item={item} />
            ))}
        </nav>

        {/* Logout */}
        <div className="p-4">
            <button className="w-full bg-green-800 hover:bg-green-700 py-3 rounded-lg">
            Log out
            </button>
        </div>
        </aside>
    );

}
export default Sidebar


function SidebarItem({ item }:SidebarItemProps) {
    const [open, setOpen] = useState(false);
    const hasChildren = !!item.children?.length;

    return (
        <div>
        {/* Parent */}
        <div
            className="flex items-center justify-between p-2 rounded hover:bg-green-800 cursor-pointer"
            onClick={() => hasChildren && setOpen(!open)}
        >
            {hasChildren ? (
            <span className="flex items-center gap-2">
                {item.label}
            </span>
            ) : (
            <Link to={`${schoolPath}${item.path}`} className="w-full">
                {item.label}
            </Link>
            )}

            {hasChildren &&
            (open ? (
                <ChevronDown size={16} />
            ) : (
                <ChevronRight size={16} />
            ))}
        </div>

        {/* Children */}
        {hasChildren && open && (
            <div className="ml-4 mt-1 space-y-1 bg-green-800 rounded p-2">
            {item.children!.map((child) => (
                <Link
                key={child.label}
                to={`${schoolPath}${item.path}/${child.path}`}
                className="block px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                &gt; {child.label}
                </Link>
            ))}
            </div>
        )}
        </div>
    );
}
