


export const ViewStudentModal = ({viewModal,selectedStudent,setViewModal,leaveHistory,handleLeaveAction}) => {


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
    <br />
    <hr />

{leaveHistory &&
        <div>
        <h2 className="text-md font-semibold text-green-700 mt-4 mb-2">
            Leave for day
        </h2>
            
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1">

            <div className="justify-between items-center mb-2">
            <span className="text-xs mr-1 text-gray-500">
                {new Date(leaveHistory?.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </span>

            {leaveHistory?.status && (
                <span
                    className={`text-xs px-2 py-1 rounded-full ${
                    leaveHistory?.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : leaveHistory?.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {leaveHistory?.status}
                </span>
                )}

                <p className="font-semibold mt-2 text-gray-800">
                    <span className="text-gray-500">Reason</span>: {leaveHistory?.reason}
                </p>
                

                {/* Body */}
                <p className="text-sm text-gray-600 mb-2">
                    {leaveHistory?.body}
                </p>

                {/* Attachment */}
                {leaveHistory?.attachment && (
                    <a
                    href={leaveHistory?.attachment}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline block mb-2"
                    >
                    View Attachment
                    </a>
                )}

                  {/* ACTION BUTTONS */}
            <div className="flex gap-2 mt-2">
                <button
                onClick={() => handleLeaveAction(leaveHistory, "approved")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded-lg transition"
                >
                Approve
                </button>

                <button
                onClick={() => handleLeaveAction(leaveHistory, "rejected")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-2 rounded-lg transition"
                >
                Reject
                </button>
            </div>

            </div>
            </div>
            </div>}

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