import React, { useEffect, useState } from "react";
import { Pencil, X , Lock, } from "lucide-react";
import { handleApi,HandleApiOptions } from "@/api/global.api";
import InputField from "@/components/inputField";
import { school_Register_SchemaFor_Address } from "@/constants/createSchool";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { toast } from "react-toastify";
import { IDocument,IUploadedDoc } from "@/interfaces/IRegister";
import Swal from "sweetalert2";
import { handleValidationOF } from "@/validation/validateFormData";
import { addressValidate, passwordSchema } from "@/validation/school.validator";
import DocumentUploadModal from "@/components/Document/Document.upload.modal";
import { ISubjectReducer, setSchool_MDA_Data,toggleMDALoading } from "@/utils/Redux/Reducer/school.reducer";
import { IResetPassword } from "@/interfaces/ISchool";


/* ------------------------------------------------ */
interface IAddress{
    city:string,
    street:string,
    state:string,
    zip:string,
    country:string,
}

const SchoolSettingsPage = () => {

    /**
     * USE-STATE
     */
    const [showOtp, setShowOtp] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    
    
    const [utils,setUtils]=useState(
        {   error:"",
            loading:false,
            isOpen:false,
            isOpenDocument:false,
            isOpenUploadDocument:false
        }
    );



    //address
    const [form, setForm] = useState<IAddress>(
        {
            city:"",
            street:"",
            state:"",
            zip:"",
            country:"",
        });

    const [documentState,setDocuments]=useState<Partial<IDocument>>({
        docs:[],
        role:"School",
    });

    const [selectedFile, setSelectedFile] =
    useState<IUploadedDoc | null>(null);

    const [openView, setOpenView] = useState(false);

    
    /**
     * Redux
     */
    const dispatch=useAppDispatch();
    const {meta,documents,address,loading}=useAppSelector((state)=>state.schoolMDA);
    //handle image
    const [image, setImage] = useState(
        {preview:meta?.profile??"/school/profile_image.jpg",
        file:""}
    );
    
    /**
     * USE-EFFECT
     */
    useEffect(()=>{
            (async()=>{
                const config:HandleApiOptions<null>=
                    {
                        method:"get",
                        endPoint:"/school/data/fetch",
                        payload:null,
                        headers:{role:"school"}
                    }

                const res= await handleApi<null,ISubjectReducer>(config);
                
                if(!res.data){
                    toast.warn("Kindly re-login again")
                    return;
                }

                const {meta,documents,address}=res.data.data;

                const wrapper:ISubjectReducer={
                    meta,documents,address,
                    loading:false,
                    error:null
                }

                //update the meta,documents,address STATES
                /**
                 * DOCUMENT 
                */
                setDocuments({
                    docs:documents?.docs||[],
                    role:documents?.role
                });

                /**
                 * Address
                 */
                setForm({
                    street:address.street,
                    state:address.state,
                    city:address.city,
                    zip:address.zip,
                    country:address.country
                })
                

                dispatch(setSchool_MDA_Data(wrapper));

                return true;
            })();
    },[dispatch,loading])



    /**
     * School_Meta  
    */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) return;

        // preview image
        const imageURL = URL.createObjectURL(file);
        setImage({preview:imageURL,file:file});
    };

    const handleUpdateProfile=async ()=>{
        dispatch(toggleMDALoading());
        const id=address.userId;
        const formData=new FormData();
        formData.append("profile",image.file);
        
        //api call
        const config:HandleApiOptions<object>={
            method: "patch",
            endPoint: `/school/update/meta/${id}`,
            payload: formData,
            headers:{role:"school"},
        }

        const res=await handleApi<object,null>(config);
        dispatch(toggleMDALoading());

        if(!res.success){
            setUtils({
                error:res.data?.message || 
                res.data?.error,
                loading:false,
                isOpen:false,
                isOpenDocument:false,
                isOpenUploadDocument:false}
            );
            setImage((prev)=>({...prev,preview:"/school/profile_image.jpg"}));
            return res.success;
        }
        setImage((prev)=>({...prev,preview:"/school/profile_image.jpg"}));

        return res.success;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = 
            e.target as HTMLInputElement;

        document.getElementById(e.target.name)!.textContent = "";

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePasswordChange=async(passwords:IResetPassword)=>{
        const userId=address.userId;

        const isValid=handleValidationOF(passwordSchema,passwords);
        
        if(!isValid.success){
            return false;
        }
        const data=
        {role:"School",password1:passwords.pass1,password2:passwords.pass2};

        const config:HandleApiOptions<object>={
            endPoint:`/password/reset/${userId}`,
            method:"patch",
            payload:data,
            headers:{role:"School"}
        };
        

        setShowOtp(false);
        
        const res=await handleApi<object,null>(config);

        setShowResetModal(false);
        if(!res.success){
            toast.error("Cant update password");
            return res.success;
        }

        toast.success("Password Change successfully");
        return res.success;
    }


    /**
     * Address
     */
    const handleSubmitEditAddress = 
        async() => {
            const id=address.userId;
            //validation
            const isValid=handleValidationOF(addressValidate,form);
            
            if(!isValid.success){
                return isValid.success;
            }

            dispatch(toggleMDALoading());

            const config:HandleApiOptions<IAddress>={
                method:"put",
                endPoint:`/address/edit/${id}`,
                payload:form,
                headers:{role:"school"}
            }
            const res=await handleApi<IAddress,null>(config);
            
            dispatch(toggleMDALoading());
            if(!res.success){return res.success};
            
            toast.success("Edited the address successfully");
            setUtils((prev)=>({...prev, isOpen:false}));
            //need to refreshThePage
            return res.success;
    }


    /**
     * Document
     */
    const handleSubmitEditDocument = 
        async() => {
            const id=address.userId;
            
            dispatch(toggleMDALoading());
            const config:HandleApiOptions<IAddress>={
                method:"put",
                endPoint:`/documents/edit/${id}`,
                payload:form,
                headers:{role:"school"}
            }
            const res=await handleApi<IAddress,null>(config);
            
            if(!res.success){return res.success};
            
            toast.success("Edited the address successfully");
            setUtils((prev)=>({...prev, isOpen:false}));
            //need to refreshThePage
            return res.success;
    }


    const removeAFile = async (index: number):Promise<boolean> => {

        const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "This action cannot be undone!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it",
                });
        
        if(!result.isConfirmed){
            return;
        }
        dispatch(toggleMDALoading())

        //Reload the data again 
        const userId:string=address.userId;
        
        const delete_fileName=documents.docs[index].fileName;

        const config:HandleApiOptions<null>={
            endPoint:`/documents/${userId}`,
            payload:null,
            method:"delete",
            headers:{role:"School"},
            params:{"file_Name":delete_fileName}
        }

        const res=await handleApi<null,null>(config);
        
        dispatch(toggleMDALoading());
        if(!res.success){
            toast.error(`Error 500: ${res.data.error}`);
            return res.success;
        }

        toast.success("File Removed successfully 200");
        return res.success;
    };


    const handleView = (index: number) => {
        const subDocument=documentState.docs[index];
        
        if(!subDocument){
            toast.error("Throwing error 409 : Check Later");
            return;
        }

        setSelectedFile(subDocument);
        setOpenView(true);
    };


    const handleSaveFile = async (file: File) => {
        // This save is to 
        // edit individual document 

        console.log("New file:", file);

        // 🔥 API call here
        // await uploadNewFile(file);

        setOpenView(false);
    };

    const handleUploadDocuments = async (files: File[]) => {
        try {
            const formData = new FormData();
            const userId=address.userId;
            //validation of size and same file upload

            files.forEach((file) => {
                formData.append("docs", file);
            });

            dispatch(toggleMDALoading());
            const config:HandleApiOptions<FormData>={
                method:"put",
                endPoint:`/documents/${userId}`,
                payload:formData,
                headers:{role:"School"},
            }

            const res=await handleApi<FormData,null>(config);
            
            dispatch(toggleMDALoading());
            if(!res.success){
                toast.error(`Error 500: ${res.data.error}`);
                return res.success;
            }

            toast.success("Documents uploaded successfully");

            setUtils((prev)=>({...prev,isOpenUploadDocument:false}));
        } catch (error) {
            toast.error(
            error?.response?.data?.message ||
                "Document upload failed"
            );
        }
    };

    const handleCloseDocumentsModal = () => {
        setUtils((prev)=>({...prev,isOpenUploadDocument:false}));
    };




    return (
        <div className="p-6 bg-white min-h-screen max-w-6xl space-y-6">

        {/* ================= SCHOOL PROFILE ================= */}

        <Card title="School Profile">
            <div className="flex items-center gap-6">

            {/* Logo */}
            <div className="relative">
                <img
                src={
                    image.preview !== "/school/profile_image.jpg" 
                    ?image.preview: meta?.profile 
                }
                className="w-24 h-24 rounded-full border object-cover"
                />
                <input
                type="file"
                onChange={(e)=>handleImageChange(e)}
                placeholder="change"
                className="absolute w-20 text-center h-7 text-sm bottom-0 right-0 bg-green-700 p-1 rounded-full text-white"/>

                {/* buttons */}
            {image.preview !== "/school/profile_image.jpg" && <div className="flex gap-3">

                {/* ADD */}
                <button
                onClick={handleUpdateProfile}
                className="bg-green-600 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700 m-1 transition"
                >
                {loading ? "Updating..." : "Update"}
                </button>
            

                {/* REMOVE */}
                <button
                onClick={()=>setImage({preview:"/school/profile_image.jpg",file:null})}
                className="bg-red-600 text-white px-4 me-25 py-1 rounded-full text-sm m-1 hover:bg-red-700 transition"
                >
                Remove
                </button>

            </div>}
                
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
                <p className="text-gray-800 font-medium text-lg">
                {meta?.schoolName}
                </p>

                <p className="text-sm text-gray-500">
                {meta?.email}
                </p>

                <button
                onClick={() =>setShowResetModal(true)}
                className="mt-3 inline-flex items-center gap-2 text-green-700 text-sm font-medium hover:underline"
                >
                <Lock size={16} />
                Change Password
                </button>
            </div>
            </div>
        </Card>

        {/* ================= EMAIL VERIFICATION ================= */}

        {showOtp && (
            <Card title="Verify Email">
            <p className="text-sm text-gray-500 mb-4">
                We’ll send an OTP to your registered email.
            </p>

            <button
                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
            >
                Send OTP
            </button>
            </Card>
        )}

        {/* ================= ADDRESS ================= */}

        <Card title="Address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">

            <Info label="Street" value={address?.street} />
            <Info label="City" value={address?.city} />
            <Info label="State" value={address?.state} />
            <Info label="Zip" value={address?.zip} />
            <Info label="Country" value={address?.country} />
            </div>

            <button
            onClick={()=>setUtils((prev)=>({...prev,isOpen:true}))}
            className="mt-4 text-green-700 text-sm font-medium hover:underline">
            {loading ? "Editing" : "Edit Address"}
            </button>
        </Card>

        {/* MODAL */}
        {utils.isOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">

                <h2 className="text-xl font-semibold mb-4">
                Edit Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {school_Register_SchemaFor_Address.map((ele,i)=>
                        <InputField key={i} value={form?.[ele.name]} label={ele.name} placeholder={ele.placeholder} type={ele.placeholder} name={ele.name} onChange={handleChange} />
                    )}

                </div>

                {/* buttons */}
                <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={() => setUtils((prev)=>({...prev,isOpen:false}))}
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

        {utils.isOpenUploadDocument 
        && 
        
        <DocumentUploadModal 
            open={utils.isOpenUploadDocument}  
            onClose={handleCloseDocumentsModal}
            onUpload={handleUploadDocuments}
        />
        
        }

        {/* ================= DOCUMENTS ================= */}

        <Card title="Documents">
            <div className="space-y-3">
                {/* Uploaded Files List */}
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                
                <h3 className="text-gray-700 font-semibold mb-1">
                    Uploaded Files
                </h3>
                
                <button 
                    onClick={()=>setUtils((prev)=>({...prev,isOpenUploadDocument:true}))}
                    type="button"
                    className="mb-1 text-green-500 text-sm underline"> 
                    Upload
                </button>

                <div className="overflow-y-auto max-h-60">
                    {!loading && documentState.docs?.length > 0 ? documentState.docs.map((file:IUploadedDoc, index:number) => (
                        <DocumentRow file={file} removeAFile={removeAFile} editFile={handleView} key={index} index={index} />
                    )) :(
                        <p className="text-gray-500 font-semibold text-sm mb-3">No Documents are available</p>
                    )
                }
                </div>
                </div>
            
            </div>
        </Card>

        {/* MODAL-DOCUMENT */}
        {utils.isOpenDocument && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">

                <h2 className="text-xl font-semibold mb-4">
                Edit Document
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {school_Register_SchemaFor_Address.map((ele,i)=>
                        <InputField key={i} value={form?.[ele.name]} label={ele.name} placeholder={ele.placeholder} type={ele.placeholder} name={ele.name} onChange={handleChange} />
                    )}

                </div>

                {/* buttons */}
                <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={() => setUtils((prev)=>({...prev,isOpenDocument:false}))}
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


        {
            openView &&  
            <ViewFileModal 
            open={openView} 
            file={selectedFile} 
            onClose={()=>setOpenView(false)} 
            onSave={handleSaveFile} />
        }


        {/* ================= PASSWORD RESET MODAL ================= */}

        {showResetModal && (
            <PasswordResetModal
            onClose={() => setShowResetModal(false)} 
            onSubmit={(passwords:IResetPassword)=>handlePasswordChange(passwords)}
            />
        )}
        </div>
    );
};


function Card({
    title,
    children,
    }: {
    title: string;
    children: React.ReactNode;
    }) {
    return (
        <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {title}
        </h2>
        {children}
        </div>
    );
}


function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
        </div>
    );
}



interface DocumentRowProps {
    file: IUploadedDoc;
    index: number;
    removeAFile: (index: number) => void;
    editFile: (index: number) => void;
}

function DocumentRow({
    file,
    removeAFile,
    editFile,
    index,
}: DocumentRowProps) {
    return (
        <div className="flex justify-between items-center border p-3 rounded-md mb-1">
        <span className="text-sm">
            {file.fileName.split("-")[0]}
        </span>

        <div className="flex justify-end gap-3 mt-6">
            <button
            onClick={() => removeAFile(index)}
            className="text-red-500 text-sm font-medium hover:underline"
            >
            Remove
            </button>

            <span className="text-sm">|</span>

            <button
            onClick={() => editFile(index)}
            className="text-green-700 text-sm font-medium hover:underline"
            >
            View
            </button>
        </div>
        </div>
    );
}


interface Props {
    open: boolean;
    file: IUploadedDoc | null;
    onClose: () => void;
    onSave: (file: File) => void;
}

function ViewFileModal({ open, file, onClose, onSave }: Props){
    const [editMode, setEditMode] = useState(false);
    const [newFile, setNewFile] = useState<File | null>(null);

    if (!open || !file) return null;

    const isImage = file?.fileName.startsWith("school_images");
    const isPdf = file?.fileName === "application/pdf";

    const handleCancel = () => {
        setEditMode(false);
        setNewFile(null);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="bg-white rounded-lg w-[90%] max-w-3xl p-6 relative">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">
                {file?.fileName}
            </h2>

            <div className="flex gap-3">
                {!editMode && (
                <Pencil
                    className="w-5 h-5 cursor-pointer text-green-700"
                    onClick={() => setEditMode(true)}
                />
                )}

                <X
                className="w-5 h-5 cursor-pointer"
                onClick={onClose}
                />
            </div>
            </div>

            {/* Preview */}
            <div className="border rounded p-4 h-[450px] overflow-auto flex justify-center items-center">

            {/* IMAGE */}
            {isImage && (
                <img
                src={file?.url}
                className="max-h-full"
                />
            )}

            {/* PDF */}
            {isPdf && (
                <iframe
                src={file?.url}
                className="w-full h-full"
                />
            )}
            </div>

            {/* EDIT MODE */}
            {editMode && (
            <div className="mt-4 border-t pt-4">

                <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                    setNewFile(e.target.files?.[0] ?? null)
                }
                />

                <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 border rounded"
                >
                    Cancel
                </button>

                <button
                    disabled={!newFile}
                    onClick={() => {
                    if (newFile) onSave(newFile);
                    setEditMode(false);
                    }}
                    className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-40"
                >
                    Save
                </button>
                </div>

            </div>
            )}
        </div>
        </div>
    );
};



function PasswordResetModal({
    onClose,
    onSubmit
    }: {
    onClose: () => void,onSubmit:(password:IResetPassword)=>Promise<boolean>
}) {
    

    const [resetPasswords,SetResetPasswords]=useState<IResetPassword>(
        {pass1:"",
        pass2:""
    });

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        const spanTag=document.getElementById(name);

        if(spanTag){
            spanTag.textContent="";
        }

        SetResetPasswords((prev)=>({...prev,[name]:value}));
        return true;
    }

return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-lg p-6">

        <h3 className="text-lg font-semibold mb-4">
        Reset Password
        </h3>

        <div className="space-y-4">

        <InputField name="pass1" onChange={handleChange} placeholder="New password" type="string" label="password1"/>

        <InputField name="pass2" onChange={handleChange} placeholder="Confirm password" type="string" label="Confirm password"/>

        </div>

        <div className="flex justify-end gap-4 mt-6">
        <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded-md"
        >
            Back
        </button>

        <button
        onClick={()=>onSubmit(resetPasswords)}
        type="button"
        className="
        bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
        >
            Submit
        </button>
        </div>
    </div>
    </div>
);
}



export default SchoolSettingsPage;
