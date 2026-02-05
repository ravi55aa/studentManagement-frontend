// import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import {UserSearchIcon} from "lucide-react";

export default function DashboardHome() {
    return (
        <div className="flex-1 p-10">
            <h1 className="text-3xl font-semibold text-center text-gray-800">
            Welcome to your dashboard, Udemy school
            </h1>

            <p className="text-center text-gray-600 text-lg mt-2">
            Uyo/school/@teachable.com
            </p>

            {/* ACTIONS SECTION */}
            <div className="max-w-3xl mx-auto mt-12 space-y-10">

            {/* Add Admins */}
            <DashboardAction
                icon={<UserSearchIcon className="text-xl text-black" />}
                title="Add other admins"
                description="Create rich course content and coaching products for your students. 
                When you give them a pricing plan, they'll appear on your site!"
            />

            {/* Add Classes */}
            <DashboardAction
                icon={<UserSearchIcon className="text-xl text-black" />}
                title="Add classes"
                description="Create rich course content and coaching products for your students. 
                When you give them a pricing plan, they'll appear on your site!"
            />

            {/* Add Students */}
            <DashboardAction
                icon={<UserSearchIcon className="text-xl text-black" />}
                title="Add students"
                description="Create rich course content and coaching products for your students. 
                When you give them a pricing plan, they'll appear on your site!"
            />
            </div>
        </div>
    );
    }

    function DashboardAction({ icon, title, description }) {
    return (
        <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-xl">{icon}</div>

        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-1 max-w-lg">{description}</p>
        </div>
        </div>
    );

}
