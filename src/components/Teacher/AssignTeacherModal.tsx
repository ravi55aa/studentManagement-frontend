import { AssignTeacherModalProps } from "@/types/types";
import { useState } from "react";

export default function AssignTeacherModal({
    open,
    teachers,
    batchId,
    onClose,
    onAssign,
    }: AssignTeacherModalProps) {
    const [selectedTeacher, setSelectedTeacher] = useState<string>("");

    if (!open) return null;
    console.warn(batchId)

    const handleSubmit = async () => {
        if (!selectedTeacher) return;
        await onAssign(selectedTeacher);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/30">

        <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-6">

            <h2 className="text-lg font-semibold mb-4">
            Assign Batch Counselor
            </h2>

            <div className="max-h-64 overflow-y-auto space-y-2 border p-4 rounded-md bg-gray-50">

            {teachers.length === 0 ? (
                <p className="text-sm text-gray-500">
                No available teachers
                </p>
            ) : (
                teachers.map((teacher) => (
                <label
                    key={teacher._id}
                    className="flex items-center gap-3 cursor-pointer text-sm"
                >
                    <input
                    type="radio"
                    name="teacher"
                    value={teacher._id}
                    checked={selectedTeacher === teacher._id}
                    onChange={() => setSelectedTeacher(teacher._id!)}
                    className="accent-green-700"
                    />

                    {teacher.firstName} {teacher.lastName}
                </label>
                ))
            )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
            <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border"
            >
                Cancel
            </button>

            <button
                onClick={handleSubmit}
                disabled={!selectedTeacher}
                className="px-4 py-2 rounded-md bg-green-700 text-white disabled:opacity-50"
            >
                Assign
            </button>
            </div>

        </div>
        </div>
    );
}
