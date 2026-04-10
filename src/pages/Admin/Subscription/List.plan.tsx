import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { PlanService } from '@/api/Services/Admin/plan.service';
import { toast } from 'react-toastify';
import { Eye } from 'lucide-react';

import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';

import {
    setPlans,
    togglePlansLoading,
} from '@/utils/Redux/Reducer/plans.reducer';

import { TableComponent } from '@/components/Table.Component';

const UserPlanList = () => {
    const dispatch = useAppDispatch();
    const { plans, loading } = useAppSelector((state) => state.subscriptionPlans);

    //  Fetch Plans
    useEffect(() => {
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

        fetchPlans();
    }, []);

    //  View Plan (optional modal later)
    const handleView = (plan: any) => {
        console.log(plan);
    };

    return (
        <div className="p-6 bg-white min-h-screen">

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
                <Eye
                    onClick={() => handleView(plan)}
                    className="w-4 h-4 cursor-pointer hover:text-green-700"
                />
                ),
            },
            ]}
        />

        <Pagination />
        </div>
    );
};

export default UserPlanList;