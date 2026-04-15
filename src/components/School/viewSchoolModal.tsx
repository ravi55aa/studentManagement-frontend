import { IDocument, IUploadedDoc } from "@/interfaces/IRegister";

export const SchoolViewModal = ({ viewSchool, isModalOpen, onClose }) => {
    if (!isModalOpen || !viewSchool) return null;

    const {meta,address,documents}=viewSchool

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white w-[600px] p-6 rounded-lg space-y-4">

            {/* META */}
            <div>
            <h2 className="font-bold text-lg mb-2">School</h2>
            <p>Name: {meta?.schoolName}</p>
            <p>Admin: {meta?.adminName}</p>
            <p>Email: {meta?.email}</p>
            <p>Phone: {meta?.phone}</p>
            </div>

            {/* ADDRESS */}
            <div>
            <h2 className="font-bold text-lg mb-2">Address</h2>
                <p>{address?.street}</p>
                <p>{address?.city}</p>
                <p>{address?.state}</p>
                <p>{address?.zip}</p>
                {!address && <p>No Address</p>}
            </div>

            {/* DOCUMENTS */}
            <div>
            <h2 className="font-bold text-lg mb-2">Documents</h2>
            {documents.docs?.map((doc:IUploadedDoc)=>
            { return (<> <a href={doc?.url} target="_blank">
                        {doc?.fileName}
                    </a>
                    <br />
                </>)
                }
            )}
            
            {documents.docs.length==0 && <p>No documents</p>}

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