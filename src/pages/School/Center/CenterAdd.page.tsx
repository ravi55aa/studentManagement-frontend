//!validation is pending



import { addressValidate, centerSchema } 
    from "@/validation/school.validator";
import { handleValidationOF } 
    from "@/validation/validateFormData";
import { useState } 
    from "react";
import { HandleApiOptions,handleApi }
from "@/api/global.api";
import InputField 
    from "@/components/inputField";
import { addCenter_Form_Fields, inputStyleRegisterSchoolAddress, school_Register_SchemaFor_Address } from "@/constants/createSchool";
import { toast } from "react-toastify";
import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { useAppHandleInputChange as _useAppHandleInputChange } from "@/hooks/useHandleInputChange";
import { IAddress } from "@/interfaces/IRegister";


export interface ICenterForm {
    name: string;
    code: string;
    phone: string;
    email: string;
    headInCharge: string;
    currentStrength?: string;
    totalCapacity: string;
    type?: string;
    isMain: boolean;
    isActive: boolean;
    _id?:string
}



const AddCenter = () => {

    const [form, setForm] = useState<ICenterForm>({
        name: "",
            code: "",
                phone: "",
                    email: "",
                        headInCharge: "",
                        currentStrength: "",
                    totalCapacity: "",
            isMain: false,
        isActive: true,
    });

    const [formData,setFormData]=useState({
                    street:"",
                        city: "",
                            state: "",
                                zip: "",
                                    country: null,
    });

    const [util, setUtils] = useState({error:"",openAddress:false});
    const {goToCenter,goBack}=useAppNavigate();



    /**** center meta ****/
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
        const isValid=handleValidationOF(centerSchema,form);
        
        if(!isValid.success) return isValid.success;

        //api call
        const config:HandleApiOptions<ICenterForm>={
            method: "post",
            endPoint: "/school/centers/add",
            payload: form,
            headers:{role:"school"},
        }

        const res=await handleApi<ICenterForm,ICenterForm>(config);


        if(!res.success){
            setUtils({error:res.data?.message || res.data?.error,openAddress:false});
            console.log("res success if faule");
            return res.success;
        }

        const centerDoc=res?.data?.data;
        localStorage.setItem("newCenter_id_ForAddress",JSON.stringify(centerDoc?._id));

        setUtils({error:null,openAddress:true});
        //flag  open for address
        return true;
    };


    /***** Center Address****/

    /**
     * 
     */

    const handleAddAddressSubmit =   
        async(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            

        const isValidated = //!cross check given data
            handleValidationOF(
                addressValidate,formData);
            
        //validateMethod(Schema,data)
        if(!isValidated.success){return isValidated.success;}

        const id = 
            JSON.parse(
                localStorage.getItem("newCenter_id_ForAddress")
        );

        //api call
        /**
         * config_ration
         * Before sending into the chef i need to wrap it in good manner
         * thats why config is needed;
         */

        const config:HandleApiOptions<IAddress>={
            method: "post",
            endPoint: `/school/centers/add/address/${id}`,
            payload: formData,
            headers:{role:"school"},
        }

        /**
         * This config will go backend
         * will start creating
         * and "res" is how backend work with given data
         * The res may fail, or may win 
         * if win serve it, else 
         * check the user_config or else backend work
         */
        const res = await handleApi(config);

        if(!res.success){
            setUtils((prev)=>({...prev,error:res.data.error}));
        }
        
        toast.success("New center Added successfully");
        
        setUtils((prev)=>({...prev,error:null}));
        localStorage.removeItem("newCenter_id_ForAddress");
        goToCenter();
        return true;
    };


    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        {!util.openAddress && <><h1 className="text-2xl font-semibold text-gray-800 mb-1 underline">
            Add New Center
        </h1>
        <p className="text-sm text-gray-500 mb-6 underline">
            Fill in the details to create a new center
        </p></>}

        {/* Error */}
        {util?.error?.trim() && (
            <p className="text-red-600 text-sm mb-4">{util.error}</p>
        )}

        {/* center-from */}

        {!util.openAddress &&
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-md p-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            
            {addCenter_Form_Fields.map((ele,i)=>{
                return (
                    <InputField 
                    key={i}
                    onChange={handleChange}
                    uniqueKey={ele.name+i+i+i}
                    disabled={ele?.disabled}
                    {...ele}
                    />
            )})}

            {/* Head In Charge */}
            <div>
                <label>Head In charge</label>
                <select
                name="headInCharge"
                value={form.headInCharge}
                onChange={handleChange}
                className={inputStyleRegisterSchoolAddress}
                >
                <option value="">Select admin</option>
                <option value="1">Admin One</option>
                <option value="2">Admin Two</option>
                </select>
                <span className="ps-2 text-red-500" id="headInCharge"></span>
            </div>


            {/* Toggles */}
            <div className="w-full flex flex-wrap">
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="isMain"
                checked={form.isMain}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm text-gray-700">
                Is Main
                </span>
                <span id="isMain" className="text-sm text-gray-700">
                </span>
            </div>

            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm text-gray-700">
                Is Active
                </span>
                <span id="isActive" className="text-sm text-gray-700">
                </span>
            </div>
            </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
            <button
                onClick={goBack}
                type="button"
                className="px-6 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
            >
                Save Center
            </button>
            </div>
        </form>
        }



        {/* //*Add new Address  */}

        {util.openAddress &&
        <div className="flex justify-center items-center min-h-screen bg-white px-4">

            
            

            <div className="w-full   max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">
                Add Center Address
                </h1>
                <p className="text-center text-gray-600 mb-8">
                Please enter your school center location details.
                </p>
            <form onSubmit={handleAddAddressSubmit} className="space-y-4">
                            
                <div className="flex flex-col gap-4">
                {school_Register_SchemaFor_Address.map((ele,i)=>{
                    return (
                    <InputField 
                    key={i}
                    uniqueKey={ele.name+i+i}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{_useAppHandleInputChange(e,setFormData)}}
                    name={ele.name}
                    type={ele.type}
                    placeholder={ele.placeholder}
                    />
                )})}
                </div>
            
            
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Add Center Address;
                </button>
                </form>
            </div>
        </div>
        }

        </div>
    );
};

export default AddCenter;
