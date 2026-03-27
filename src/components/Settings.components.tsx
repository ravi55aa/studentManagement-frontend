import { useEffect, useState } from "react";
import { AddressService } from "@/api/Services/address.service";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { IAddress, IDocument, IUploadedDoc } from "@/interfaces/IRegister";
import { toggleMDALoading } from "@/utils/Redux/Reducer/school.reducer";
import { school_Register_SchemaFor_Address } from "@/constants/createSchool";
import { addressValidate } from "@/validation/school.validator";
import { handleValidationOF } from "@/validation/validateFormData";
import { toast } from "react-toastify";
import { Card, Info, ViewFileModal } from "./School/card";
import InputField from "./inputField";
import DocumentRow from "./Document/Documents.row";
import DocumentUploadModal from "./Document/Document.upload.modal";
import { DocumentService } from "@/api/Services/document.service";
import Swal from "sweetalert2";
import { DocumentRoute } from "@/constants/routes.contants";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { Roles } from "@/constants/role.enum";


/******* ADDRESS *******/

export const ProfileAddressComponent=({role,loading,setUtils,utils})=>{
    const dispatch=useAppDispatch();
    const {user}=useAppSelector((state)=>state.currentUser);
    
    const [form, setForm] = useState<IAddress>({
        city: '',
        street: '',
        state: '',
        zip: '',
        country: '',
    });
    

    useEffect(()=>{
        if(!user.id){
            toast.warn('User id is invalid');
            return;
        }
        (async()=>{
            const res=await AddressService.get(role,user.id);
            
            if(!res.success){
                toast.warn(res.error?.message);
                return res.success;
            }

            const address=res.data.data;
            setForm(address);
            return res.success;
        })();
        
    },[user.id]);


    const handleSubmitEditAddress = async () => {
        
        //validation
        const isValid = handleValidationOF(addressValidate, form);
    
        if (!isValid.success) {
            return isValid.success;
        }
    
        dispatch(toggleMDALoading());
    
        const res = await AddressService.update(Roles.Student,user.id, form);
    
        dispatch(toggleMDALoading());
        if (!res.success) {
            return res.success;
        }
    
        toast.success('Edited the address successfully');
        setUtils((prev) => ({ ...prev, isOpen: false }));
        return res.success;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        document.getElementById(e.target.name)!.textContent = '';

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    return (
    <div>
        <Card title="Address">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <Info label="Street" value={form?.street} />
            <Info label="City" value={form?.city} />
            <Info label="State" value={form?.state} />
            <Info label="Zip" value={form?.zip} />
            <Info label="Country" value={form?.country} />
        </div>

        <button
            onClick={() => setUtils((prev) => ({ ...prev, isOpen: true }))}
            className="mt-4 text-green-700 text-sm font-medium hover:underline"
        >
            {loading ? 'Editing' : 'Edit Address'}
            </button>
        </Card>

      {/* MODAL */}
        {utils.isOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {school_Register_SchemaFor_Address.map((ele, i) => (
                    <InputField
                    key={i}
                    value={form?.[ele.name]}
                    label={ele.name}
                    placeholder={ele.placeholder}
                    type={ele.placeholder}
                    name={ele.name}
                    onChange={handleChange}
                    />
                ))}
                </div>

                {/* buttons */}
                <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={() => setUtils((prev) => ({ ...prev, isOpen: false }))}
                    className="px-4 py-2 rounded border"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmitEditAddress}
                    className="px-4 py-2 rounded bg-green-600 text-white"
                >
                    Save
                </button>
                </div>
            </div>
            </div>
        )}
    </div>)

}



/***** DOCUMENTS *****/
export const ProfileDocumentsComponent=({role,setUtils,utils,loading})=>{

    const [selectedFile, setSelectedFile] = useState<IUploadedDoc | null>(null);
    const [openView, setOpenView] = useState(false);
    const [documentState, setDocuments] = useState<Partial<IDocument>>({
    docs: [],
    role: role,
    });
    const dispatch=useAppDispatch();
    const {user}=useAppSelector((state)=>state.currentUser);
    
    useEffect(()=>{
        if(!user.id){
            toast.warn('User id is invalid');
            return;
        }

        (async()=>{
            const res=await DocumentService.get(role,user.id);
            
            if(!res.success){
                toast.warn(res.error?.message);
                return res.success;
            }

            const documents=res.data.data;
            // console.log("@settigns.component documents",documents);
            if(documents){
                setDocuments(documents);
            }
            
            return res.success;
        })();
        
    },[user.id]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        document.getElementById(e.target.name)!.textContent = '';

        setDocuments((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmitEditDocument = async () => {
        //id,form

        dispatch(toggleMDALoading());
        const config: HandleApiOptions<Partial<IDocument>> = {
            method: 'put',
            endPoint: `${DocumentRoute.edit}/${user.id}`,
            payload: documentState,
            headers: { role: role },
        };
        const res = await handleApi<Partial<IDocument>, IDocument>(config);

        if (!res.success) {
            toast.error(res.error.message);
            return res.success;
        }

        toast.success(res.data.message);
        setUtils((prev) => ({ ...prev, isOpen: false }));
        //need to refreshThePage
        return res.success;
    };
    
    const removeAFile = async (index: number): Promise<boolean> => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
    });

    if (!result.isConfirmed) {
        return;
    }
    dispatch(toggleMDALoading());

    const delete_fileName = documentState.docs[index].fileName;

    const res = await DocumentService.delete(user.id, delete_fileName);

    dispatch(toggleMDALoading());
    if (!res.success) {
        toast.error(`Error 500: ${res.data.error}`);
        return res.success;
    }

    toast.success('File Removed successfully 200');
    return res.success;
    };
    
    const handleView = (index: number) => {
        const subDocument = documentState.docs[index];

        if (!subDocument) {
            toast.error('Throwing error 409 : Check Later');
            return;
        }
        setSelectedFile(subDocument);
        setOpenView(true);
    };

    const handleSaveFile = async (file: File) => {
        // This save is to
        // edit individual document

        console.log('New file:', file);

        // API call here
        // await uploadNewFile(file);

        setOpenView(false);
    };

    const handleUploadDocuments = async (files: File[]) => {
    try {
        const formData = new FormData();
        //validation of size and same file upload

        files.forEach((file) => {
        formData.append('docs', file);
        });

        dispatch(toggleMDALoading());

        const res = await DocumentService.create(user.id, formData);

        dispatch(toggleMDALoading());
        if (!res.success) {
        toast.error(`Error 500: ${res.data.error}`);
        return res.success;
        }

        toast.success('Documents uploaded successfully');

        setUtils((prev) => ({ ...prev, isOpenUploadDocument: false }));
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Document upload failed');
    }
    };

    const handleCloseDocumentsModal = () => {
    setUtils((prev) => ({ ...prev, isOpenUploadDocument: false }));
    };
    
    return(<div>
        {utils.isOpenUploadDocument && (
    <DocumentUploadModal
        open={utils.isOpenUploadDocument}
        onClose={handleCloseDocumentsModal}
        onUpload={handleUploadDocuments}
    />
    )}
    <Card title="Documents">
            <div className="space-y-3">
                {/* Uploaded Files List */}
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <h3 className="text-gray-700 font-semibold mb-1">Uploaded Files</h3>
    
                <button
                    onClick={() => setUtils((prev) => ({ ...prev, isOpenUploadDocument: true }))}
                    type="button"
                    className="mb-1 text-green-500 text-sm underline"
                >
                    Upload
                </button>
    
                <div className="overflow-y-auto max-h-60">
                    {!loading && documentState.docs?.length > 0 ? (
                    documentState.docs.map((file: IUploadedDoc, index: number) => (
                        <DocumentRow
                        file={file}
                        removeAFile={removeAFile}
                        editFile={handleView}
                        key={index}
                        index={index}
                        />
                    ))
                    ) : (
                    <p className="text-gray-500 font-semibold text-sm mb-3">
                        No Documents are available
                    </p>
                    )}
                </div>
                </div>
            </div>
            </Card>
    

    
            {/* MODAL-DOCUMENT */}
            {utils.isOpenDocument && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Document</h2>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {school_Register_SchemaFor_Address.map((ele, i) => (
                    <InputField
                        key={i}
                        value={documentState?.[ele.name]}
                        label={ele.name}
                        placeholder={ele.placeholder}
                        type={ele.placeholder}
                        name={ele.name}
                        onChange={handleChange}
                    />
                    ))}
                </div>
    
                {/* buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                    onClick={() => setUtils((prev) => ({ ...prev, isOpenDocument: false }))}
                    className="px-4 py-2 rounded border"
                    >
                    Cancel
                    </button>
    
                    <button
                    onClick={handleSubmitEditDocument}
                    className="px-4 py-2 rounded bg-green-600 text-white"
                    >
                    Save
                    </button>
                </div>
                </div>
            </div>
            )}
    
            {openView && (
            <ViewFileModal
                open={openView}
                file={selectedFile}
                onClose={() => setOpenView(false)}
                onSave={handleSaveFile}
            />
            )}
    </div>)
}