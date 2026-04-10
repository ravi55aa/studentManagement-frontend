export const SchoolViewModal = ({ viewSchool, isModalOpen, onClose }) => {
    if (!isModalOpen || !viewSchool) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white w-[600px] p-6 rounded-lg space-y-4">

            {/* META */}
            <div>
            <h2 className="font-bold text-lg mb-2">Meta Info</h2>
            <p>Name: {viewSchool.schoolName}</p>
            <p>Admin: {viewSchool.adminName}</p>
            <p>Email: {viewSchool.email}</p>
            <p>Phone: {viewSchool.phone}</p>
            </div>

            {/* ADDRESS */}
            <div>
            <h2 className="font-bold text-lg mb-2">Address</h2>
            <p>{viewSchool.address?.street}</p>
            <p>{viewSchool.address?.city}</p>
            <p>{viewSchool.address?.state}</p>
            <p>{viewSchool.address?.zip}</p>
            </div>

            {/* DOCUMENTS */}
            <div>
            <h2 className="font-bold text-lg mb-2">Documents</h2>
            <a href={viewSchool.documents?.registrationCert} target="_blank">
                Registration Certificate
            </a>
            <br />
            <a href={viewSchool.documents?.idProof} target="_blank">
                ID Proof
            </a>
            </div>

            <button
            onClick={onClose}
            className="bg-green-700 text-white px-4 py-2 rounded"
            >
            Close
            </button>
        </div>
        </div>
    );
};