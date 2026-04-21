import { BatchService } from '@/api/Services/batch.service';
import { TeacherService } from '@/api/Services/teacher.service';
import { ActionBtn, Pagination } from '@/components'
import SearchAndFilter from '@/components/SearchAndFilter'
import { TableComponent } from '@/components/Table.Component'
import { paginationQuery } from '@/constants/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { IBatches } from '@/interfaces/ISchool';
import { storeBatches } from '@/utils/Redux/Reducer/batchReducer';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListBatches = () => {

    const [search, setSearch] = useState('');
    const batchReduxStore = useAppSelector((state) => state.batch);
    const currentUser = useAppSelector((state) => state.currentUser);

    const dispatch = useAppDispatch();
    const navigate=useNavigate();

    const {prevPage,nextPage,pagination,setPagination}=usePagination(fetchBatches,8);

    async function fetchBatches() {
        console.log('Fetching batches...');

        const teacherId=currentUser.user.id;
        
        if(!teacherId){
            toast.warn('No teacherId');
            return;
        }
    
        const res=await TeacherService.getById(teacherId);
        const teacher=res.data.data?.teacher;

        if(!res.success || !teacher.center){
            toast.warn(res.error.message);
            return ;
        }

        const res2 = await BatchService.getAllWithQuery({center:teacher.center},paginationQuery);

        if (!res2.success) {
            toast.warn(res2.error.message);
            return ;
        }

        const {data,page,total,totalPages} = res2.data.data;

        setPagination({page,total,totalPages});
        
        dispatch(storeBatches(data||[])); //batches

        return ;
    }

    useEffect(() => {
        fetchBatches();
    }, []);


    /* ---------- Filtering ---------- */
    const filteredBatches =  batchReduxStore?.batches && batchReduxStore?.batches?.filter(
    (batch: IBatches) =>
        batch.name.toLowerCase().includes(search.toLowerCase()) ||
        batch.code.toLowerCase().includes(search.toLowerCase()),
    );


    return (
        <div className="p-6 bg-[#ffffff] min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-md text-sm bg-white">Export CSV</button>
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
                <Link to="add">Add Batch</Link>
            </button>
            </div>

            <Bell className="text-green-700 w-5 h-5" />
        </div>

        <SearchAndFilter />

        <TableComponent
            data={filteredBatches ?? []}
            keyField="adminId"
            loading={batchReduxStore?.loading}
            emptyMessage="No Batches found"
            columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Code', accessor: 'code' },
            {
                header: 'Batch Counselor',
                accessor: 'batchCounselor',
                format: (value: { firstName: string }) => value?.firstName.toUpperCase(),
            },
            {
                header: 'Start Date',
                accessor: 'schedule',
                format: (value: { startTime: string }) => value.startTime?.slice(0, 10),
            },
            {
                header: 'End Date',
                accessor: 'schedule',
                format: (value: { endTime: string }) => value.endTime?.slice(0, 10),
            },
            {
                header: 'Actions',
                align: 'center',
                render: (batch) => (
                <div className="flex justify-center gap-3">
                    <ActionBtn label="Mark Attendance" path={`${batch?._id}/markAttendance`} />
                </div>
                ),
            },
            ]}
        />

        {/* ---------- Mobile Card View ---------- */}
        <div className="lg:hidden space-y-4">
            {filteredBatches.map((batch) => (
            <div key={batch?._id} className="bg-white border rounded-md p-4">
                <div className="font-semibold">{batch.name}</div>
                {/* <div className="text-sm text-gray-600">
                    {batch.center && batch.center?.name}
                    </div> */}
                <div className="text-sm">Counselor: Murali Manohar</div>
                <div className="text-sm mb-3">Code: {batch.code}</div>

                <div className="flex flex-wrap gap-2">
                <ActionBtn label="Mark Attendance" path={`${batch?._id}/markAttendance`} />
                </div>
            </div>
            ))}
        </div>

        <Pagination pagination={pagination} onLeftClick={prevPage} onRightClick={nextPage} />
        </div>
    )
}

export default ListBatches