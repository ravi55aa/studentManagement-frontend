import { Detail } from "@/components/Teacher/ActionBar";
import { ITeacherBio } from "@/interfaces/ITeacher";

type TeacherDetailsModalProps = {
    open: boolean;
    teacher: ITeacherBio; // replace with your combined type
    onClose: () => void;
    };

export default function TeacherDetailsModal({
    open,
    teacher,
    onClose,
}: TeacherDetailsModalProps) {

    if (!open || !teacher) return null;

    const formatDate = (date: string) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString();
    };
    console.log(formatDate("23/3/24"));


return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
        backdrop-blur-lg bg-black/20">


        {/* Modal Container */}
        <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">

            {/* Close Button */}
            <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-lg"
            >
            ✕
            </button>

            <h2 className="text-2xl font-semibold mb-6">
            Teacher Details
            </h2>

            {/* ---------------- BASIC INFO ---------------- */}
            <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 border-b pb-2">
                Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="First Name" value={teacher.firstName} />
                <Detail label="Last Name" value={teacher.lastName} />
                <Detail label="Email" value={teacher.email} />
                <Detail label="Phone" value={teacher.phone} />
                <Detail label="Qualification" value={teacher.qualification} />
                {/* <Detail
                label="Date of Birth"
                value={formatDate(teacher?.dateOfBirth)}
                /> */}
                <Detail label="Experience" value={`${teacher.experience} years`} />
                <Detail label="Gender" value={teacher.gender} />
            </div>
            </div>

            {/* ---------------- PROFESSIONAL INFO ---------------- */}
            <div>
            <h3 className="text-lg font-medium mb-3 border-b pb-2">
                Professional Details
            </h3>

            {/* <div className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Employment Status" value={teacher.employmentStatus} />
                <Detail label="Designation" value={teacher.designation} />
                <Detail
                label="Center"
                value={teacher.centerId?.name}
                />
                <Detail
                label="Academic Year"
                value={teacher.academicYearId?.year}
                />
                <Detail
                label="Class Teacher Of"
                value={teacher.classTeacherOf?.name}
                />
                <Detail
                label="Date of Joining"
                value={formatDate(teacher.dateOfJoining)}
                />
                <Detail
                label="Date of Leaving"
                value={formatDate(teacher.dateOfLeaving)}
                />
            </div> */}

            {/* Subjects */}
            {/* <div className="mt-4">
                <p className="font-medium">Assigned Subjects:</p>
                <ul className="list-disc ml-5 text-sm">
                {teacher.assignedSubjects?.map((sub: any) => (
                    <li key={sub._id}>
                    {sub.name} ({sub.code})
                    </li>
                ))}
                </ul>
            </div> */}

            {/* Department */}
            {/* <div className="mt-4">
                <p className="font-medium">Department:</p>
                <p className="text-sm">
                {teacher.department?.join(", ")}
                </p>
            </div> */}
            </div>

            {/* Footer Close Button */}
            <div className="mt-8 flex justify-end">
            <button
                onClick={onClose}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
            >
                Close
            </button>
            </div>
        </div>
        </div>
    );
    }
