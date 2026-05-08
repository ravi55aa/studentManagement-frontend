import { useCallback, useEffect, useState } from "react";
import { AddressService } from "@/api/Services/address.service";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { IAddress, IDocument, IUploadedDoc } from "@/interfaces/IRegister";
import { toggleMDALoading } from "@/utils/Redux/Reducer/school.reducer";
import { school_Register_SchemaFor_Address } from "@/constants/createSchool";
import { addressValidate } from "@/validation/school.validator";
import { handleValidationOF } from "@/validation/validateFormData";
import { Card, Info, ViewFileModal } from "./School/card";
import DocumentUploadModal from "./Document/Document.upload.modal";
import { DocumentService } from "@/api/Services/document.service";
import DocumentRow from "./Document/Documents.row";
import { Roles } from "@/constants/role.enum";
import InputField from "./inputField";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
    MapPin,
    Building2,
    Globe2,
    Landmark,
    Mailbox,
    Pencil,
    FileText,
    Upload,
    FolderOpen,
} from "lucide-react";


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
            const res=await AddressService.getAAddress(user.id);
            
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
        
        dispatch(toggleMDALoading());
        //validation
        const isValid = handleValidationOF(addressValidate, form);

        if (!isValid.success) {
            dispatch(toggleMDALoading());
            return isValid.success;
        }

        const res = await AddressService.update(user.id, form);

        dispatch(toggleMDALoading());
        if (!res.success) {
            return res.success;
        }

        toast.success('Edited the address successfully');
        setUtils((prev) => ({ ...prev, isOpen: false,loading:false }));
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
        <Card title="Address Information">

        <div className="flex flex-col xl:flex-row gap-8">

          {/* Left Illustration */}
            <div className="xl:w-[280px]">

                <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 h-full">

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 shadow-sm">
                    <MapPin className="w-8 h-8 text-emerald-700" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-800">
                    Student Address
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Manage and update your residential and
                    location details for academic communication.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700">
                    Secure Information
                </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1">

                {/* Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Street */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <Building2 className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        Street
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                        {form?.street || "Not Added"}
                        </h3>
                    </div>
                    </div>
                </div>

                {/* City */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <Landmark className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        City
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                        {form?.city || "Not Added"}
                        </h3>
                    </div>
                    </div>
                </div>

                {/* State */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <MapPin className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        State
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                        {form?.state || "Not Added"}
                        </h3>
                    </div>
                    </div>
                </div>

                {/* Zip */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <Mailbox className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        ZIP Code
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                        {form?.zip || "Not Added"}
                        </h3>
                    </div>
                    </div>
                </div>

                {/* Country */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 md:col-span-2">

                    <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <Globe2 className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        Country
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                        {form?.country || "Not Added"}
                        </h3>
                    </div>
                    </div>
                </div>
                </div>

                {/* Edit Button */}
                <button
                onClick={() =>
                    setUtils((prev) => ({
                    ...prev,
                    isOpen: true,
                    }))
                }
                className="
                    mt-8
                    inline-flex items-center gap-3
                    rounded-2xl
                    bg-gradient-to-r from-emerald-600 to-green-600
                    px-6 py-4
                    text-sm font-semibold text-white
                    shadow-md
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-lg
                "
                >
                <Pencil className="w-4 h-4" />

                {loading
                    ? "Editing..."
                    : "Edit Address"}
                </button>
            </div>
            </div>
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
    
    const handleDocumentsFetch=useCallback(async()=>{
        const res=await DocumentService.getById(user.id);
        
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
    },[user.id]);

    useEffect(()=>{
        if(!user.id){
            toast.warn('User id is invalid');
            return;
        }

        handleDocumentsFetch();
    },[user.id,dispatch,loading]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        document.getElementById(e.target.name)!.textContent = '';

        setDocuments((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmitEditDocument = async () => {

        dispatch(toggleMDALoading());

        const res = await DocumentService.update(user.id,documentState)

        if (!res.success) {
            toast.error(res.error.message);
            return res.success;
        }
        
        toast.success(res.data.message);
        await handleDocumentsFetch()
        setUtils((prev) => ({ ...prev, isOpen: false }));
        //need to refreshThePage
        return res.success;
    };
    
    const handleRemoveAFile = async (index: number): Promise<boolean> => {
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

        const delete_fileName = documentState.docs[index]?.fileName;

        const res = await DocumentService.deleteDocument(user.id, delete_fileName);

        dispatch(toggleMDALoading());

        if (!res.success) {
            toast.error(res?.error?.message);
            return res.success;
        }

        toast.success(res.data.message);
        
        await handleDocumentsFetch();

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
            toast.error(res.error.message);
            return res.success;
        }

        toast.success(res.data.message);

        await handleDocumentsFetch()

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

        <div className="space-y-5">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Upload Button */}
            <button
                onClick={() =>
                setUtils((prev) => ({
                    ...prev,
                    isOpenUploadDocument: true,
                }))
                }
                type="button"
                className="
                inline-flex items-center gap-2
                rounded-2xl
                border border-emerald-100
                bg-emerald-50
                px-5 py-3
                text-sm font-semibold text-emerald-700
                transition-all duration-200
                hover:bg-emerald-100
                "
            >
                <Upload className="w-4 h-4" />

                Upload Document
            </button>
            </div>

            {/* Document Container */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">

                <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                    <FolderOpen className="w-5 h-5 text-emerald-700" />
                </div>

                <div>
                    <p className="font-semibold text-slate-800">
                    Files
                    </p>

                    <p className="text-xs text-slate-500">
                    {documentState.docs?.length || 0} Documents
                    </p>
                </div>
                </div>
            </div>

            {/* Documents */}
            <div className="max-h-[320px] overflow-y-auto">

                {!loading &&
                documentState.docs?.length > 0 ? (

                <div className="divide-y divide-slate-100">

                    {documentState?.docs?.map(
                    (
                        file: IUploadedDoc,
                        index: number
                    ) => (

                        <div
                        key={index}
                        className="
                            flex items-center justify-between
                            px-5 py-4
                            transition-colors duration-200
                            hover:bg-slate-50/70
                        "
                        >

                        {/* Left */}
                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                            <FileText className="w-5 h-5 text-emerald-700" />
                            </div>

                            <div>
                            <p className="font-medium text-slate-700">
                                {file?.fileName ||
                                `Document ${index + 1}`}
                            </p>

                            <p className="text-sm text-slate-400">
                                Uploaded document
                            </p>
                            </div>
                        </div>


                        {/* Right */}
                        <DocumentRow
                            file={file}
                            removeAFile={handleRemoveAFile}
                            index={index}
                        />
                        </div>
                    )
                    )}
                </div>
                ) : (

                /* Empty State */
                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                    <FolderOpen className="w-10 h-10 text-slate-400" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-700">
                    No Documents Uploaded
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                    Upload files to keep your records organized
                    </p>
                </div>
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












