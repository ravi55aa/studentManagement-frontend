import { X } from "lucide-react";

interface ITeacher {
    name: string;
    facultyNo: string;
    phone: string;
    email: string;
    gender: string;
    department?: string;
    qualification?: string;
}

interface Props {
    teacher: ITeacher;
    onClose: () => void;
}


//TODO: Move code to MAIN.Teacher.page;
// const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);

// {/* inside table action */}
// <Eye
//   className="w-4 h-4 cursor-pointer hover:text-green-700"
//   onClick={() => setSelectedTeacher(teacher)}
// />

// {/* modal */}
// {selectedTeacher && (
//   <ViewTeacherModal
//     teacher={selectedTeacher}
//     onClose={() => setSelectedTeacher(null)}
//   />
// )}





const ViewTeacherModal = ({ teacher, onClose }: Props) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        {/* Modal Box */}
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
                Teacher Details
            </h2>
            <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-500 hover:text-red-600" />
            </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

            <Info label="Name" value={teacher.name} />
            <Info label="Faculty Number" value={teacher.facultyNo} />
            <Info label="Phone" value={teacher.phone} />
            <Info label="Email" value={teacher.email} />
            <Info label="Gender" value={teacher.gender} />
            <Info
                label="Department"
                value={teacher.department || "—"}
            />
            <Info
                label="Qualification"
                value={teacher.qualification || "—"}
            />
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-8">
            <button
                onClick={onClose}
                className="px-6 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
                Close
            </button>
            </div>
        </div>
        </div>
    );
};

export default ViewTeacherModal;

/* ---------- Small helper ---------- */
function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
        </div>
    );
    }
