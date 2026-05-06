// import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GraduationCap, School, UserSearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardSection() {
  return (
    <div className="flex-1 p-5">

      {/* ACTIONS SECTION */}
      <div className="bg-white flex gap-2 mx-auto mt-12 space-y-10">
        
        {/* Add Admins */}
        <DashboardAction
          icon={<UserSearchIcon className="text-xl text-black" />}
          title="Add Teacher"
          description="Adding teachers to a digital dashboard for enhancing classroom efficiency, 
            as it streamlines administrative tasks, allowing educators to focus on instruction."
            navigateTo={'teachers/add'}
        />

        {/* Add Classes */}
        <DashboardAction
          icon={<School className="text-xl text-black" />}
          title="Add Classes"
          description="Create rich course classes and coaching products for your school. 
                When you give them a good and monitor class, they'll appear on your site!"
          navigateTo={'batches/add'}
        />

        {/* Add Students */}
        <DashboardAction
          icon={<GraduationCap className="text-xl text-black" />}
          title="Add Students"
          description="
                The Student Dashboard learners one place to manage everything about their learning. They log in, see the courses they're working through, check progress, and review certificates they've earned along the way!"
          navigateTo={'batches'}
        />

      </div>
      
    </div>
  );
}

function DashboardAction({ icon, title, description,navigateTo }) {
  return (
    <div className="flex p-5 gap-2 m-1 hover:shadow-md transition items-start space-x-4">
      <div className="bg-blue-100 p-3 rounded-xl">{icon}</div>

      <div>
        
        <h3 className="text-lg font-semibold cursor-pointer text-gray-800">
          <Link to={navigateTo}>
          {title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm mt-1 max-w-lg">{description}</p>
      </div>
    </div>
  );
}
