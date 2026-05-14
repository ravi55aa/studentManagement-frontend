import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import { storeFees, toggleFeeLoading } from '@/utils/Redux/Reducer/fee.reducer';
import { toast } from 'react-toastify';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import StatusBadge from '@/components/fee/StatusBadge.c';
import TypeBadge from '@/components/fee/TypeBadge.c';
import { FeeService } from '@/api/Services/fee.service';
import { StudentFeeService } from '@/api/Services/Student/studentFee.service';
import { Roles } from '@/constants/role.enum';
import { IFee } from '@/interfaces/IFee';
import { IStudentFee } from '@/interfaces/IStudent';
import { Bell } from 'lucide-react';
import NotificationModal from '@/components/Notification/component/NotificationModal';
import { paginationQuery } from '@/constants/pagination';
import Pagination from '@/components/Pagination.c';
import { TPaginationQuery } from '@/types/paginationTypes';
import { usePagination } from '@/hooks/usePagination';
import { filter_Fee_Types } from '@/constants/feesTypes';

export default function StudentFeeListPage() {
    const dispatch = useAppDispatch();
    const feeStore = useAppSelector((state) => state.fees);
    const {user} = useAppSelector((state) => state.currentUser);
    const [studentFeeDetails, setStudentFeeDetails] = useState<IStudentFee[]>([]);
    const [mergedFees, setMergedFees] = useState<IFee[]>([]);
    const navigate = useNavigate();

    //search+filter
    const [filterValues,setFilterValues]=useState<{
        filterValue: { name:string,value:string }[],
        searchQuery: Record<string,string|number> 
    }>  ({
            filterValue:filter_Fee_Types,
            searchQuery:{}
    });

    //Notification
    const [open, setOpen] = useState(false);
    const {pagination,nextPage,prevPage,setPagination}=usePagination(handleGetStudentFees,paginationQuery.limit);

    async function handleGetStudentFees (paginationQuery:TPaginationQuery) {
        dispatch(toggleFeeLoading(true));

        //  Make sure to update into
        //  filtering the query, by the there are specific
        //  center, course may vary.  
        const res = await FeeService.getAllWithQuery(paginationQuery,
            {...filterValues.searchQuery}); 
        
        dispatch(toggleFeeLoading(false));

        if (!res.success) {
            toast.error(res.error.message);
            dispatch(storeFees( []));
            return;
        }

        const {data,page,total,totalPages} = res.data?.data;
        
        setPagination({page,total,totalPages});

        dispatch(storeFees(data || []));
        
        return;
    };

    const handleGetStudentPaidFeeDetail=async()=>{
        const res = await StudentFeeService.getAllStudentFeeDetails(user.id); 

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        const feeData=res.data?.data;

        setStudentFeeDetails(feeData);
    }

    useEffect(() => {
            handleGetStudentFees(paginationQuery);
            handleGetStudentPaidFeeDetail();
    }, [filterValues.searchQuery]);

    const handlePay = (feeAmount: number,feeId: string) => {
        const locationState={
            'amount':feeAmount,
            'studentFeeId':feeId,
            'userId':user.id,
            'role':Roles.Student
        };

        navigate('/checkout',{state:locationState});
    };

    useEffect(() => {
        if (!feeStore.fees) return;

        const feeDetails = feeStore.fees.map((fee: IFee) => {
            const matched = studentFeeDetails.find(
            (sFee) => sFee.feeId === fee._id.toString()
            );

            return matched
            ? { ...fee, status: matched.status }
            : { ...fee, status: "pending" };
        });

        setMergedFees(feeDetails);
    }, [feeStore.fees, studentFeeDetails]);

    return (
        <div className="p-8 bg-white-100 min-h-screen">
        
        <div className="flex justify-between items-center mb-6">

            <h1 className="text-xl font-semibold mb-4">My Fees</h1>

            <Bell className="text-green-700 cursor-pointer" 
            onClick={() => setOpen(true)} />

        </div>

        <NotificationModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />

        <SearchAndFilter
            filterField='type'
            filterValues={filterValues.filterValue}
            
            searchField='name'
            placeHolder='Search homework using fee names' 

            setSearchQuery={setFilterValues}
        />

        <TableComponent
            data={mergedFees ?? []}
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
                    disabled={fee?.status === 'paid'}
                    onClick={() => handlePay(fee?.totalAmount,fee?._id)}
                    className={`px-3 py-1 text-sm rounded-md text-white 
                        ${
                        fee?.status === 'paid'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                    {fee?.status === 'paid' ? 'Paid' : 'Pay'}
                    </button>
                </div>
                ),
            },
            ]}
        />

        <Pagination pagination={pagination} onLeftClick={prevPage} onRightClick={nextPage} />
        </div>
    );
}