import { ICourseForm } from '@/interfaces/ICourseForm'
import { Info } from './School/card'

const CourseViewModal = ({viewCourse,isModalOpen,onClose}:{viewCourse:ICourseForm,isModalOpen:boolean,onClose:()=>void}) => {
    return (
        <div>
            {isModalOpen && viewCourse && (
            <div className="fixed inset-0  bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
                
                <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl py-6 px-20 gap-3 shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
            ✕
        </button>


        <h2 className="text-xl font-semibold mb-6 text-green-700">
            Course Details
        </h2>

        {/* ===== BASIC INFO ===== */}
        <div className="mb-6 px-10">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
            Basic Info
            </h3>

            <div className="grid grid-cols-2 gap-4">
            <Info label="Name" value={viewCourse.name} />
            <Info label="Code" value={viewCourse.code} />

            <Info
                label="Academic Year"
                value={viewCourse.academicYear?.year || "-"}
            />

            <div>
                <p className="text-gray-500 text-sm">Status</p>
                <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                    viewCourse.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
                >
                {viewCourse.status}
                </span>
            </div>
            </div>
        </div>
        <hr />
        <br />

        {/* ===== COURSE DETAILS ===== */}
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
            Course Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
            <Info
                label="Duration"
                value={`${viewCourse.duration?.value} ${viewCourse.duration?.unit}`}
            />

            <Info
                label="Max Students"
                value={String(viewCourse.maxStudents) || "-"}
            />

            <Info
                label="Enrollment"
                value={viewCourse.enrollmentOpen ? "Open" : "Closed"}
            />
            </div>

            <div className="mt-4">
            <p className="text-gray-500 text-sm">Description</p>
            <p className="text-sm">{viewCourse.description}</p>
            </div>
        </div>
        <hr />
        <br />

        {/* ===== SCHEDULE ===== */}
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
            Schedule
            </h3>

            <div className="grid grid-cols-2 gap-4">
            <Info label="Start Date" value={viewCourse.schedule?.startDate.slice(0,10)} />
            <Info label="End Date" value={viewCourse.schedule?.endDate.slice(0,10)} />
            </div>
        </div>
        <hr />
        <br />

        {/* ===== SUBJECTS & CLASSES ===== */}
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
            Course Mapping
            </h3>

            <div className="grid grid-cols-2 gap-4">
            <Info
                label="Subjects"
                value={
                viewCourse.subjects?.map((s: any) => s.name).join(", ") || "-"
                }
            />

            <Info
                label="Classes"
                value={
                viewCourse.classes?.join(", ") || "-"
                }
            />
            </div>
        </div>

        {/* ===== ATTACHMENTS ===== */}
        <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
            Attachments
            </h3>

            <div className="space-y-2">
            {viewCourse.attachments?.length ? (
                viewCourse.attachments.map((file: any, i: number) => (
                <a
                    key={i}
                    href={file.url}
                    target="_blank"
                    className="block text-blue-600 hover:underline text-sm"
                >
                    {file.fileName}
                </a>
                ))
            ) : (
                <p className="text-sm text-gray-400">No attachments</p>
            )}
            </div>
        </div>
</div>
    </div>
    )}
        </div>
    )
}

export default CourseViewModal