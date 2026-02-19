//!validation is pending



import { addressValidate, centerSchema } 
    from "@/validation/school.validator";
import { handleValidationOF } 
    from "@/validation/validateFormData";
import { useEffect, useState } 
    from "react";
import { HandleApiOptions,handleApi }
from "@/api/global.api";
import {InputField} 
    from "@/components";
import { addCenter_Form_Fields, 
    inputStyleRegisterSchoolAddress, 
    school_Register_SchemaFor_Address 
    } from "@/constants/createSchool";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { toast } from "react-toastify";
import { ICenterForm } from "@/interfaces/ISchool";
import { IAddress } from "@/interfaces/IRegister";
import { useAppHandleInputChange as _useAppHandleInputChange } 
    from "@/hooks/useHandleInputChange"; 



const EditCenter = () => {

    const [form, setForm] = useState({
        name: "",
            code: "",
                phone: "",
            email: "",
            headInCharge: "",
                currentStrength: "",
            totalCapacity: "",
            type: "",
                isMain: false,
        isActive: true,
    });

    const [addressForm,setAddressForm]=useState({
                street:"",
                    city: "",
                        state: "",
                            zip: "",
                                country: 'india',
    });

    const {id}=useParams();
    const {goBack,goToCenter}=useAppNavigate();

    const [util, setUtils] = useState({error:"",openAddress:false});


    useEffect(()=>{
        const fetchYear=async()=>{
            const config:HandleApiOptions<null>={
                endPoint:`/school/centers/${id}`,
                method:"get",
                headers:{role:"school"},
            }
            const res=await handleApi<null,ICenterForm>(config);

            if(!res.success){
                setUtils({error:"Center Edit error" ,openAddress:false});
            }

            const subjectDoc=res?.data?.data;
            
            setForm({
                name: subjectDoc?.name||"",
                    code: subjectDoc?.code||"",
                        phone: subjectDoc?.phone||"",
                            email: subjectDoc?.email||"",
                            headInCharge: subjectDoc?.headInCharge||"",

                currentStrength: subjectDoc?.currentStrength||"",

                    totalCapacity: subjectDoc?.totalCapacity||"",
                        type: subjectDoc?.type||"",
                            isMain: subjectDoc?.isMain||false,
                            isActive: subjectDoc?.isActive||false,
            });

            setUtils((prev)=>({...prev,error:null}));
            return true;
        }
        fetchYear();
    },[]);


    useEffect(()=>{
        const fetchesCenterAddress=async ()=>{
            
            const config:HandleApiOptions<null>={
                method:"get",
                    endPoint:`/address/get/${id}`,
                        headers:{role:"school"},
            }

            const res=await handleApi<null,IAddress>(config);

            if(!res.success){
                setUtils({error:res.data?.message || res.data?.error,openAddress:true});
            }

            const doc=res?.data?.data;
            console.log("@editCenters addressDoc",res);
            
            setAddressForm({
                street:doc?.street||"",
                    city: doc?.city||"",
                        state: doc?.state||"",
                            zip: doc?.zip||"",
                                country: doc?.country||"india",
            });

            setUtils((prev)=>({...prev,error:null}));
            return true;
        }

        fetchesCenterAddress();
    },[]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        document.getElementById(e.target.name)!.textContent = "";

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent):Promise<boolean>=> {

        e.preventDefault();

        //validation
        //const isValid=handleValidationOF(centerSchema,form);
        //if(!isValid.success) return isValid.success;

        //api call
        const config:HandleApiOptions<ICenterForm>={
            method: "put",
                endPoint: `/school/centers/edit/${id}`,
                payload: form,
                    headers:{role:"school"},
        }

        const res=await handleApi(config);

        if(res.success){
            toast.success("Updated Successfully");
        }
        setUtils((prev)=>({...prev,error:null}));

        return true;
    };


    /*****Address*****/

    const handleEditAddress=()=>{
        setUtils((prev)=>({...prev,openAddress:!util.openAddress}));


    }

    const handleAddressSubmit = 
                    async(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        
                        const isValidated = 
                            handleValidationOF(
                                addressValidate,addressForm);
                            //validateMethod(Schema,data)
                        
                        if(!isValidated.success){return isValidated.success;}
    
            const id=JSON.parse(localStorage.getItem("newCenter_id_ForAddress"));
    
            //api call
            const config:HandleApiOptions<IAddress>={
                method: "post",
                    endPoint: `/school/centers/add/address/${id}`,
                    payload: addressForm,
                headers:{role:"school"},
            }
    
            const res=await handleApi(config);
    
            if(!res.success){
                setUtils((prev)=>({...prev,error:res.data.error}));
            }
            
            toast.success("Address updated successfully");
            
            setUtils((prev)=>({...prev,error:null}));
            localStorage.removeItem("newCenter_id_ForAddress");
            goToCenter();
            return true;
        };


    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Edit Center
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Fill in the details to update center
        </p>

        {/* Error */}
        {util.error && (
            <p className="text-red-600 text-sm mb-4">{util.error}</p>
        )}

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-md p-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            
            {addCenter_Form_Fields?.map((ele,i)=>{
                return (
                    <InputField 
                    key={i}
                    uniqueKey={ele?.name+i+i+i}
                    onChange={handleChange}
                    name={ele?.name}
                    type={ele?.type}
                    value={(form?.[ele.name])?.toString()}
                    placeholder={ele?.placeholder}
                    />
            )})}

            {/* Head In Charge */}
            <div>
                <label>Head In charge</label>
                <select
                name="headInCharge"
                value={form?.headInCharge}
                onChange={handleChange}
                className={inputStyleRegisterSchoolAddress}
                >
                <option value="">Select admin</option>
                <option value="1">Admin One</option>
                <option value="2">Admin Two</option>
                <option value="692ea85eafeeac6f247ad278">Head</option>
                </select>
                <span className="ps-2 text-red-500" id="headInCharge"></span>
            </div>


            {/* Toggles */}
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="isMain"
                checked={form?.isMain}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm text-gray-700">
                Is Main Center
                </span>
            </div>

            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="isActive"
                checked={form?.isActive}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm text-gray-700">
                Is Active
                </span>
            </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
            <button
                type="button"
                onClick={goBack}
                className="px-6 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
            >
                Update Center
            </button>
            </div>
        </form>
            <button
                type="button"
                onClick={handleEditAddress}
                className="px-6 flex-end my-6 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
            >
                {util.openAddress ? "Close Edit Address" : "Edit Address ?" } 
            </button>


        {util.openAddress &&
                <div className="flex min-h-screen bg-white px-4">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold mb-2">
                        Add Center Address
                        </h1>
                        <p className=" text-gray-600 mb-8">
                        Please enter your school center location details.
                        </p>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                                    
                        <div className="flex flex-col gap-4">
                        {addressForm && school_Register_SchemaFor_Address?.map((ele,i)=>{
                            return (
                            <InputField 
                            key={i+ele.name}
                            uniqueKey={ele.name+i+i}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{_useAppHandleInputChange(e,setAddressForm)}}
                            name={ele.name}
                            type={ele.type}
                            placeholder={ele.placeholder}
                            value={addressForm?.[ele.name] ?? ""}
                            />
                        )})}
                        </div>
                    
                    
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            Update Center Address;
                        </button>
                        </form>
                    </div>
                </div>
                }
        </div>
    );
};

export default EditCenter;
