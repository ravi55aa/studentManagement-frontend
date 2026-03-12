import React, { useState } from "react";

interface Student {
    _id: string;
    name: string;
    admissionNumber: string;
    gender: string;
}

const PromoteStudentsPage = () => {

    const [students] = useState<Student[]>([
        { _id: "1", name: "Kristin Watson", admissionNumber: "1001", gender: "Male" },
        { _id: "2", name: "Marvin McKinney", admissionNumber: "1051", gender: "Male" },
        { _id: "3", name: "Jane Cooper", admissionNumber: "1002", gender: "Female" },
        { _id: "4", name: "Cody Fisher", admissionNumber: "1003", gender: "Male" },
        { _id: "5", name: "Bessie Cooper", admissionNumber: "1095", gender: "Male" },
        { _id: "6", name: "Leslie Alexander", admissionNumber: "1120", gender: "Female" },
    ]);

    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const toggleStudent = (id: string) => {
        setSelectedStudents((prev) =>
        prev.includes(id)
            ? prev.filter((s) => s !== id)
            : [...prev, id]
        );
    };

    const handlePromote = () => {
        console.log("Promote students:", selectedStudents);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-4">
            Promote Students – <span className="text-gray-500">6 A</span>
        </h1>

        {/* Next Level */}
        <p className="text-sm text-gray-500 mb-6">
            Next Promotion Level: <span className="font-semibold text-gray-700">Class 7</span>
        </p>

        {/* Table */}
        <div className="border rounded-md overflow-hidden">

            <table className="w-full text-sm">

            <thead className="bg-gray-100 border-b">
                <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Admission No</th>
                <th className="text-left px-4 py-2">Gender</th>
                </tr>
            </thead>

            <tbody>

                {students.map((student, index) => {

                const isSelected = selectedStudents.includes(student._id);

                return (
                    <tr
                    key={student._id}
                    className={`${
                        index % 2 === 1 ? "bg-green-100" : ""
                    } ${isSelected ? "bg-blue-100" : ""}`}
                    >

                    <td className="px-4 py-3 flex items-center gap-3">

                        <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleStudent(student._id)}
                        />

                        {student.name}

                    </td>

                    <td className="px-4 py-3">{student.admissionNumber}</td>

                    <td className="px-4 py-3">{student.gender}</td>

                    </tr>
                );
                })}

            </tbody>

            </table>

        </div>

        {/* Footer */}
        <div className="flex gap-4 mt-6">

            <button
            onClick={handlePromote}
            className="bg-gray-400 text-white px-6 py-2 rounded-md"
            >
            Promote
            </button>

            <button className="border px-6 py-2 rounded-md">
            Cancel
            </button>

        </div>

        </div>
    );
};

export default PromoteStudentsPage;