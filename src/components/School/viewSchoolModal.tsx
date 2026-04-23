import {  IUploadedDoc } from "@/interfaces/IRegister";
import { useState } from "react";
import PreviewModal from "../PreviewModa";

export const SchoolViewModal = ({ viewSchool, isModalOpen, onClose }) => {
    if (!isModalOpen || !viewSchool) return null;

    const {meta,address,documents}=viewSchool
    const [utils,setUtils] = useState({selectedUrl:'',isOpen:false});

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
            { return (
            <> 
            <button
                type="button" 
                onClick={()=>setUtils({selectedUrl:doc.url,isOpen:true})}
                className="bg-gray-100 mb-1 hover:bg-gray-200 px-3 py-1 rounded-md text-gray-700">

                {doc?.fileName}
            </button>
            <br />

                </>)
                }
            )}
            
            {documents.docs.length==0 && <p>No documents</p>}

            </div>

            <PreviewModal 
            isOpen={utils.isOpen} 
            onClose={()=>setUtils({isOpen:false,selectedUrl:''})} 
            url={utils.selectedUrl} 
        />

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