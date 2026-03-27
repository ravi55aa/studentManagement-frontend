import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import { storeFees, toggleFeeLoading } from '@/utils/Redux/Reducer/fee.reducer';
import { Pagination } from '@/components';
import { toast } from 'react-toastify';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import StatusBadge from '@/components/fee/StatusBadge.c';
import TypeBadge from '@/components/fee/TypeBadge.c';
import { FeeService } from '@/api/Services/fee.service';
import { StudentFeeService } from '@/api/Services/Student/studentFee.service';
import { Roles } from '@/constants/role.enum';

export default function StudentFeeListPage() {
    const dispatch = useAppDispatch();
    const feeStore = useAppSelector((state) => state.fees);
    const {user} = useAppSelector((state) => state.currentUser);
    const [studentFeeDetails,SetStudentFeeDetails]=useState([]);
    const navigate = useNavigate();

    const handleGetStudentFees = async () => {
        dispatch(toggleFeeLoading(true));

        //  You can change this API later to student-specific
        const res = await FeeService.getAll(); 

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        dispatch(toggleFeeLoading(false));
        dispatch(storeFees(res.data?.data));
    };

    const handleGetStudentPaidFeeDetail=async()=>{
        const res = await StudentFeeService.getAllStudentFeeDetails(Roles.Student,user.id); 

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        const feeData=res.data.data;

        SetStudentFeeDetails(feeData);
    }

    useEffect(() => {
        handleGetStudentFees();
        handleGetStudentPaidFeeDetail();
    }, [dispatch]);

    const handlePay = (feeId: string) => {
        const locationState={'amount':1000,'studentFeeId':feeId,'userId':user.id,'role':Roles.Student};

        navigate('/checkout',{state:locationState});
    };

    return (
        <div className="p-8 bg-white-100 min-h-screen">
        <h1 className="text-xl font-semibold mb-4">My Fees</h1>

        <SearchAndFilter />

        <TableComponent
            data={feeStore?.fees ?? []}
            keyField="_id"
            loading={feeStore?.loading}
            emptyMessage="No fees available"
            columns={[
            {
                header: 'Name',
                accessor: 'name',
            },
            {
                header: 'Code',
                accessor: 'code',
            },
            {
                header: 'Type',
                accessor: 'type',
                render: (row) => <TypeBadge type={row?.type} />,
            },
            {
                header: 'Amount',
                accessor: 'totalAmount',
                format: (value: string) => value + ' ₹',
            },
            {
                header: 'Status',
                accessor: 'status',
                render: (row) => <StatusBadge status={row?.status} />,
            },
            {
                header: 'Action',
                align: 'center',
                render: (fee) => (
                <div className="flex justify-center">
                    <button
                    disabled={fee?.status === 'PAID'}
                    onClick={() => handlePay(fee?._id)}
                    className={`px-3 py-1 text-sm rounded-md text-white 
                        ${
                        fee?.status === 'PAID'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                    {fee?.status === 'PAID' ? 'Paid' : 'Pay'}
                    </button>
                </div>
                ),
            },
            ]}
        />

        <Pagination />
        </div>
    );
}