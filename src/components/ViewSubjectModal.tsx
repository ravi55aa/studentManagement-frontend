import { IAcademicSubject } from "@/interfaces/ISchool"; 
import { Info } from "./School/card";

const SubjectViewModal = ({
    viewSubject,
    isModalOpen,
    onClose,
    }: {
    viewSubject: IAcademicSubject;
    isModalOpen: boolean;
    onClose: () => void;
    }) => {
    return (
        <>
        {isModalOpen && viewSubject  && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
            
            <div className="relative bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl py-6 px-20 gap-3 shadow-xl max-h-[90vh] overflow-y-auto">

                {/* Close Button */}
                <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                ✕
                </button>

                <h2 className="text-xl font-semibold mb-6 text-green-700">
                Subject Details
                </h2>

                {/* ===== BASIC INFO ===== */}
                <div className="mb-6 px-10">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                    Basic Info
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <Info label="Name" value={viewSubject?.name} />
                    <Info label="Code" value={viewSubject?.code} />

                    <Info
                    label="Academic Year"
                    value={(viewSubject?.academicYear as any)?.year || viewSubject?.academicYear}
                    />

                    <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                        viewSubject?.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                        {viewSubject?.status || "-"}
                    </span>
                    </div>
                </div>
                </div>

                <hr />
                <br />

                {/* ===== SUBJECT DETAILS ===== */}
                <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                    Subject Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <Info label="Class" value={viewSubject?.className} />

                    <Info
                    label="Type"
                    value={viewSubject?.type}
                    />

                    <Info
                    label="Max Marks"
                    value={String(viewSubject?.maxMarks)}
                    />

                    <Info
                    label="Pass Marks"
                    value={String(viewSubject?.passMarks) ?? "-"}
                    />

                    <Info
                    label="Credits"
                    value={String(viewSubject?.credits) ?? "-"}
                    />

                    <Info
                    label="Level"
                    value={viewSubject?.level ?? "Primary"}
                    />
                </div>

                <div className="mt-4">
                    <p className="text-gray-500 text-sm">Description</p>
                    <p className="text-sm">{viewSubject?.description || "-"}</p>
                </div>
                </div>

                <hr />
                <br />

                {/* ===== DEPARTMENT & BATCHES ===== */}
                <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                    Mapping
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <Info
                    label="Department"
                    value={viewSubject?.department ?? "-"}
                    />

                    <Info
                    label="Batches"
                    value={
                        viewSubject?.batchesToFollow?.join(", ") || "-"
                    }
                    />
                </div>
                </div>

                <hr />
                <br />

                {/* ===== RESOURCES ===== */}
                <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                    Resources
                </h3>

                {/* Reference Books */}
                <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-2">Reference Books</p>

                    {viewSubject?.referenceBooks?.length ? (
                    viewSubject.referenceBooks?.map((book, i) => (
                        <a
                        key={i}
                        href={book}
                        target="_blank"
                        className="block text-blue-600 hover:underline text-sm"
                        >
                        {book}
                        </a>
                    ))
                    ) : (
                    <p className="text-sm text-gray-400">No reference books</p>
                    )}
                </div>

                {/* Syllabus */}
                <div>
                    <p className="text-gray-500 text-sm mb-2">Syllabus</p>

                    {viewSubject?.syllabusUrl ? (
                    <a
                        href={viewSubject?.syllabusUrl}
                        target="_blank"
                        className="text-blue-600 hover:underline text-sm"
                    >
                        View Syllabus
                    </a>
                    ) : (
                    <p className="text-sm text-gray-400">No syllabus uploaded</p>
                    )}
                </div>
                </div>

            </div>
            </div>
        )}
        </>
    );
};

export default SubjectViewModal;