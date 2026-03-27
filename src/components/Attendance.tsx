

export const ViewStudentModal = ({viewModal,selectedStudent,setViewModal}) => {
    return (
        <div>{viewModal && selectedStudent && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
            Student Info
        </h2>

        <div className="space-y-2">
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p className="text-sm text-gray-500">Present: 20</p>
            <p className="text-sm text-gray-500">Absent: 5</p>
        </div>

        <button
            onClick={() => setViewModal(false)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
            Close
        </button>
        </div>
    </div>
    )}</div>
    )
}


const RemarkModal = ({remarkModal,remarkText,setRemarkText,setRemarkModal,handleSaveRemark}) => {
    return (
        <div>
            {remarkModal && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
            Add Remark
        </h2>

        <textarea
            value={remarkText}
            onChange={(e) => setRemarkText(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
        />

        <div className="flex justify-end gap-2 mt-4">
            <button
            onClick={() => setRemarkModal(false)}
            className="border px-4 py-2 rounded"
            >
            Cancel
            </button>

            <button
            onClick={handleSaveRemark}
            className="bg-green-600 text-white px-4 py-2 rounded"
            >
            Save
            </button>
        </div>
        </div>
    </div>
    )}
    </div>)
}

export default RemarkModal