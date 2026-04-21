import { Link } from 'react-router-dom';
import { SendHorizontal , Eye, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import { toast } from 'react-toastify';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import StatusBadge from '@/components/fee/StatusBadge.c';
import { HomeworkService } from '@/api/Services/Teacher/homework.service';
import { storeHomeworks } from '@/utils/Redux/Reducer/homework.reducer';
import { IAcademicSubject } from '@/interfaces/ISchool';
import NotificationModal from '@/components/Notification/component/NotificationModal';
import { StudentHomeworkService } from '@/api/Services/Student/studentHomeworkService';
import { IHomework, IHomeworkSubmission } from '@/interfaces/IHomework';
import { paginationQuery } from '@/constants/pagination';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components';

export default function FeeListPage() {
    const dispatch = useAppDispatch();
    const homeworks = useAppSelector((state) => state.homeworks);
    const [submissions,setSubmissions]=useState<IHomeworkSubmission[]>([]);

    //notification
    const [open, setOpen] = useState(false);
    const [mergedHomeworks,setMergedHomeworks]=useState([]);

    const {nextPage,pagination,prevPage,setPagination} = usePagination(fetchHomeworks,8);

    async function fetchHomeworks() {
        const user=JSON.parse(localStorage.getItem('sectionC'));
        
        if(!user){
            toast.warn('Kindly log in,Auth failed');
            return;
        }

        const res = await HomeworkService.getAllWithQuery(paginationQuery,{batch:user.batchId});

        if (!res.success) {
            toast.error(res.error.message);
            return 
        }

        const {data,page,totalPages,total}=res.data.data;

        setPagination({page,totalPages,total});

        dispatch(storeHomeworks(data||[]));
    }

    useEffect(() => {
        fetchHomeworks();
    }, [dispatch]);

    useEffect(()=>{

        const fetchStudentHomeworkDetails=async()=>{
            const result=[];
            
            for(let homework of homeworks.homeworks){
            
                const res=await StudentHomeworkService.getById(homework._id);

                if(res.success){
                    const studentHomework=res.data?.data;
                    result.push(studentHomework);
                }

            }
            setSubmissions(result);
        }

        fetchStudentHomeworkDetails();
    },[homeworks?.homeworks]);

    useEffect(()=> {
        if (!homeworks.homeworks) return;

        const homeworkDetails = homeworks.homeworks.map((homework: IHomework) => {
            const matched = submissions.find(
            (sHomework) => sHomework.homeworkId === homework._id.toString()
            );

            return matched
            ? { ...homework, status: matched.status }
            : {...homework};
        });

        setMergedHomeworks(homeworkDetails);
    }, [homeworks.homeworks, submissions]);


    const handleSubmit = async (id: string) => {
        console.log('submit');
    };


    return (
        <div className="p-8 bg-white-100 min-h-screen">
        
        {/* NotificationBar */}
        <div className="flex justify-between items-center mb-6">
        <span></span>
            <Bell className="text-green-700 cursor-pointer" 
            onClick={() => setOpen(true)} />
        </div>

        <NotificationModal
            isOpen={open}
            onClose={() => setOpen(false)}
        />

        <SearchAndFilter />

        <TableComponent
            data={mergedHomeworks ?? []}
            keyField="_id"
            loading={homeworks?.loading}
            emptyMessage="No Homeworks found"
            columns={[
            { header: 'Title',accessor: 'title',},
            { header: 'Subject', accessor: 'subjectId',
                format:(value:IAcademicSubject)=>value?.name },

            { header: 'Status', accessor: 'status',
                render: (row) => <StatusBadge status={row?.status} />
            },
            { header: 'Actions', align: 'center',
                render: (homework) => (
                <div className="flex justify-center gap-3">
                    <Link to={`add/${homework?._id}`}>
                    <Eye className="w-4 h-4 text-green-600 hover:text-green-800 hover:underline cursor-pointer" />
                    </Link>
                    
                    <div className='flex gap-1 justify-end'><SendHorizontal
                    className="w-4 h-4 text-red-600 hover:text-red-800  hover:underline cursor-pointer"
                    onClick={() => handleSubmit(homework?._id)}
                    />
                    </div>
                    
                </div>
                ),
            },
            ]}
        />

        <Pagination pagination={pagination} onLeftClick={prevPage} onRightClick={nextPage} />
        </div>
    );
}
