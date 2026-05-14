import { Link } from 'react-router-dom';
import { SendHorizontal , Eye, Bell } from 'lucide-react';
import {  useEffect, useState } from 'react';

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
import { TPaginationQuery } from '@/types/paginationTypes';
import { SubjectService } from '@/api/Services/subject.service';
import { BatchService } from '@/api/Services/batch.service';
import { IStudent } from '@/interfaces/IStudent';
import { removeEmptyFields } from '@/hooks/useDebounce';

export default function FeeListPage() {
    const dispatch = useAppDispatch();
    
    //Filter + Search query
    const [filterValues,setFilterValues]=useState<{
        filterValue:{name:string,value:string}[],
        searchQuery:Record<string,string|number> 
    }>();

    const homeworks = useAppSelector((state) => state.homeworks);
    const [submissions,setSubmissions]=useState<IHomeworkSubmission[]>([]);

    //notification
    const [open, setOpen] = useState(false);
    const [mergedHomeworks,setMergedHomeworks]=useState([]);

    const {nextPage,pagination,prevPage,setPagination} = usePagination(fetchHomeworks,1);
    
    async function fetchHomeworks(paginationQuery:TPaginationQuery) {
        
        const user=JSON.parse(localStorage.getItem('sectionC'));
        
        if(!user){
            toast.warn('Kindly log in,Auth failed');
            dispatch(storeHomeworks([]));
            return;
        }

        const res = await HomeworkService.getAllWithQuery(paginationQuery,
            {batch:user.batchId,...removeEmptyFields(filterValues.searchQuery)}
        );

        if (!res.success) {
            toast.error(res.error.message);
            return 
        }

        const {data,page,totalPages,total}=res.data.data;

        setPagination({page,totalPages,total});

        dispatch(storeHomeworks(data||[]));

        return;
    }

    useEffect(() => {
        fetchHomeworks(paginationQuery);
    }, [dispatch,filterValues.searchQuery]);

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

    const handleSubjectsMapper=(subjects:IAcademicSubject[])=>{
        if(subjects.length<=0) return; //base-case

        const subjectsMapped=subjects?.map(sub => {
            return {name:sub?.name,value:sub._id}
        });

        return subjectsMapped;
    }

    useEffect(()=>{
        
        const handleFetchValues=async() => {

            const user:IStudent=JSON.parse(localStorage.getItem('sectionC'));
            
            const batchRes=await BatchService.getById(user.batch);
            const  batchData=batchRes.data?.data;

            //{className:batch-name[0],tenantId} query tenantId

            const subjectRes=await SubjectService.getAllWithQuery({
                className:batchData.name[0],tenantId:batchData.tenantId
            });

            const subjects=subjectRes.data.data;

            //mapper
            const mappedSubjects= handleSubjectsMapper(subjects);
            
            setFilterValues((prev)=>({
                ...prev,
                filterValue:mappedSubjects
            }));
        }

        handleFetchValues();
    },[]);


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

        <SearchAndFilter 
            filterField='subjectId'
            filterValues={filterValues.filterValue}
            
            searchField='title'
            placeHolder='Search using Homework title' 

            setSearchQuery={setFilterValues}
        />

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
                    
                    <div className='flex gap-1 justify-end'>
                        <SendHorizontal
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
