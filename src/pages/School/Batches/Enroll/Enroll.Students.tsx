import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { ActionBtn } from "@/components";
import { Link } from "react-router-dom";

interface Student {
  _id: string;
  name: string;
  admissionNumber: string;
  gender: string;
}

const EnrollStudentsPage = () => {
  const [search, setSearch] = useState("");

  const [students, setStudents] = useState<Student[]>([
    { _id: "1", name: "Kristin Watson", admissionNumber: "1001", gender: "Male" },
    { _id: "2", name: "Marvin McKinney", admissionNumber: "1051", gender: "Male" },
    { _id: "3", name: "Jane Cooper", admissionNumber: "1002", gender: "Female" },
    { _id: "4", name: "Cody Fisher", admissionNumber: "1003", gender: "Male" },
  ]);

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s._id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.admissionNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Enroll Students – <span className="text-gray-500">6 A</span>
        </h1>

        <Link to="addStudents">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Add Student
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Enter Adm. No."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-60"
        />

        <input
          type="text"
          placeholder="Student name will be shown here"
          className="border rounded-md px-3 py-2 flex-1"
          disabled
        />

        <button className="bg-gray-300 px-4 py-2 rounded-md">
          Add
        </button>

      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Admission No</th>
              <th className="text-left px-4 py-2">Gender</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.map((student, index) => (
              <tr
                key={student._id}
                className={index % 2 === 1 ? "bg-green-100" : ""}
              >
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.admissionNumber}</td>
                <td className="px-4 py-3">{student.gender}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Footer buttons */}
      <div className="flex gap-4 mt-6">

        <button className="bg-gray-400 text-white px-6 py-2 rounded-md">
          Enroll
        </button>

        <button className="border px-6 py-2 rounded-md">
          Cancel
        </button>

      </div>
    </div>
  );
};

export default EnrollStudentsPage;