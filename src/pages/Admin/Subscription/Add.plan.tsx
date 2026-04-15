import { useEffect, useState } from 'react';
import { InputField } from '@/components'; 
import { subscriptionPlanFields } from '@/constants/Admin/subscription.fileds'; 
import { PlanService } from '@/api/Services/Admin/plan.service'; 
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { IPlan } from '@/interfaces/IPlan';
import { IResponse } from '@/interfaces/IResponse';
import { useAppNavigate } from '@/hooks/useNavigate.hook';

const initialState = {
    name: '',
    description: '',
    amount: 0,
    discount: 0,
    finalAmount: 0,
    duration: 30,
    benefits: [],
    maxStudents: 0,
    maxTeachers: 0,
    isActive: true,
    isPopular: false,
};

const AddPlanPage = () => {
    const [formData, setFormData] = useState(initialState);
    const [benefitInput, setBenefitInput] = useState('');
    const {planId}=useParams();
    const {goBack}=useAppNavigate();

    //Edit-plan
    useEffect(()=>{
        if(!planId) return ;

        const fetchPlan=async()=>{
            const res=await PlanService.getById(planId);

            if(!res.success){
                console.log(res.error.message);
                return res.success;
            }

            //if(!res.data.data); narrow down error;

            const plan:IPlan=res?.data?.data

            const initialState={
                name: plan?.name || '',
                description: plan?.description || '',
                amount: plan?.amount || 0,
                discount: plan?.discount || 0,
                finalAmount: plan?.finalAmount || 0,
                duration: plan?.duration || 30,
                benefits: plan?.benefits || [],
                maxStudents: plan?.maxStudents || 0,
                maxTeachers: plan?.maxTeachers || 0,
                isActive: plan?.isActive || true,
                isPopular: plan?.isPopular || false,
            }

            setFormData(initialState);

            return res.success;
        }

        fetchPlan();
    },[planId]);

    //  handle change
    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev: any) => ({
        ...prev,
        [name]:
            type === 'checkbox'
            ? checked
            : type === 'number'
            ? Number(value)
            : value,
        }));
    };

    //  handle benefits (array)
    const addBenefit = () => {
        if (!benefitInput.trim()) return;

        setFormData((prev: any) => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput],
        }));

        setBenefitInput('');
    };

    const removeBenefit = (index: number) => {
        setFormData((prev: any) => ({
        ...prev,
        benefits: prev.benefits.filter((_: any, i: number) => i !== index),
        }));
    };

    //  submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        //validation

        try {

            let res : { 
                success: boolean; 
                data?: IResponse<IPlan>; 
                error?: { 
                    message?: string; 
                    field?: string; 
                    code?: number; 
                    }; 
                };

            if(planId){
                res = await PlanService.update(planId,formData);
                
            } else {
                res = await PlanService.create(formData);

            }

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        goBack();
        toast.success('Plan created successfully');

        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen">
        <h1 className="text-xl font-semibold mb-4">Add Subscription Plan</h1>

        <form onSubmit={ handleSubmit} className="grid grid-cols-2 gap-4">

            {/*  Dynamic Inputs */}
            {subscriptionPlanFields.map((field, index) => (
            !field?.manual
            &&
            (<InputField
                key={index}
                uniqueKey={index}
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
            />)
            ))}

            {/*  Benefits */}
            <div className="col-span-2">
            <label className="text-sm font-medium">Benefits</label>
            <div className="flex gap-2 mt-1">
                <input
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                className="border px-2 py-1 w-full"
                placeholder="Enter benefit"
                />
                <button type="button" onClick={addBenefit} className="bg-green-600 text-white px-3 rounded">
                Add
                </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
                {formData.benefits.map((b: string, i: number) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                    {b}
                    <button onClick={() => removeBenefit(i)} className="ml-2 text-red-500">x</button>
                </span>
                ))}
            </div>
            </div>

            {/*  Checkboxes */}
            <div className="flex gap-4 col-span-2">
            <label>
                <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                />
                Active
            </label>

            <label>
                <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                />
                Most Popular
            </label>
            </div>

            {/*  Submit */}
            <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded col-span-2"
            >
            {planId ?  'Edit Plan' : 'Create Plan'}
            </button>
        </form>
        </div>
    );
};

export default AddPlanPage;