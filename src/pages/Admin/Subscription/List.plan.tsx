import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { PlanService } from '@/api/Services/Admin/plan.service';
import { toast } from 'react-toastify';
import { Eye, Pencil, Trash2 } from 'lucide-react';

import { Pagination, TopBar } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';

import {
    setPlans,
    togglePlansLoading,
} from '@/utils/Redux/Reducer/plans.reducer';

import { TableComponent } from '@/components/Table.Component';
import { useNavigate } from 'react-router-dom';
import { IPlan } from '@/interfaces/IPlan';
import Swal from 'sweetalert2';
import { PlanViewModal } from '@/components/plan/plan.view.modal';

const UserPlanList = () => {

    const [utils,setUtils]=useState(
        {modalIsOpen:false,plan:null}
    )

    const dispatch = useAppDispatch();
    
    const { plans, loading } = useAppSelector((state) => state.subscriptionPlans);

    const navigate=useNavigate();

    //  Fetch Plans
    const fetchPlans = async () => {
        try {
            dispatch(togglePlansLoading(true));

            const res = await PlanService.getAll({ isActive: true });

            if (!res.success) {
            toast.error(res.error.message);
            return;
            }

            dispatch(setPlans(res.data.data));
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            dispatch(togglePlansLoading(false));
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [dispatch]);

    //  View Plan (optional modal later)
    const handleView = (plan: IPlan) => {
        setUtils({plan,modalIsOpen:true});
        return true;
    };

    //delete plan
    const handleDelete = async (planId:string) => {
            
            const deletePlan = await Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it',
            });
        
            if (!deletePlan.isConfirmed) {
                return;
            }
            
            dispatch(togglePlansLoading(true));

            const res = await PlanService.delete(planId);

            dispatch(togglePlansLoading(false));

            if (!res.success) {
                toast.error(res.error.message);
                return res.success;
            }

            await fetchPlans();
            toast.success(res?.data?.message);
            return res.success;
    };

    return (
        <div className="p-6 bg-white min-h-screen">

        <button
            onClick={() => navigate('add')}
            className="bg-green-600 mr-5 mb-3 text-white px-4 py-2 rounded-md text-sm"
            >
            Add New
        </button>

        <SearchAndFilter />

        <TableComponent
            data={plans ?? []}
            keyField="_id"
            loading={loading}
            emptyMessage="No plans available"
            columns={[
            {
                header: '#',
                render: (_, index) => index + 1,
            },
            {
                header: 'Plan Name',
                accessor: 'name',
            },
            {
                header: 'Price',
                render: (plan) => (
                <div>
                    ₹{plan.finalAmount}
                    {plan.discount > 0 && (
                    <span className="ml-2 line-through text-gray-400">
                        ₹{plan.amount}
                    </span>
                    )}
                </div>
                ),
            },
            {
                header: 'Duration',
                render: (plan) => `${plan.duration} days`,
            },
            {
                header: 'Students',
                render: (plan) => plan.maxStudents || 'Unlimited',
            },
            {
                header: 'Teachers',
                render: (plan) => plan.maxTeachers || 'Unlimited',
            },
            {
                header: 'Status',
                render: (plan) => (
                <span
                    className={`px-2 py-1 rounded text-xs ${
                    plan.isPopular
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                >
                    {plan.isPopular ? 'Popular' : 'Standard'}
                </span>
                ),
            },
            {
                header: 'Actions',
                align: 'center',
                render: (plan) => (
                    <div className='flex gap-2 justify-center'>
                    <Eye
                        onClick={() => handleView(plan)}
                        className="w-4 h-4 cursor-pointer hover:text-green-700"
                    />
                    <Pencil
                    onClick={
                        () => 
                            navigate(`edit/${plan._id}`)
                        }
                        className="w-4 h-4 cursor-pointer hover:text-blue-700"
                    />
                    <Trash2
                    onClick={() => handleDelete(plan._id)}
                        className="w-4 h-4 cursor-pointer hover:text-red-700"
                    />
                </div>
                ),
            },
            ]}
        />

        {utils.modalIsOpen &&
            <PlanViewModal plan={utils.plan} isOpen={utils.modalIsOpen} onClose={()=>setUtils({plan:null,modalIsOpen:false})} />
        }

        <Pagination />
        </div>
    );
};

export default UserPlanList;