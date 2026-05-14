import { Link, useNavigate } from 'react-router-dom';
import { Bell, Eye, PencilLine, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import { Pagination } from '@/components';
import { toast } from 'react-toastify';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import StatusBadge from '@/components/fee/StatusBadge.c';
import { HomeworkService } from '@/api/Services/Teacher/homework.service';
import { storeHomeworks,toggleHomeworkLoading } from '@/utils/Redux/Reducer/homework.reducer';
import { Roles } from '@/constants/role.enum';
import { IAcademicSubject } from '@/interfaces/ISchool';
import Swal from "sweetalert2";
import { paginationQuery } from '@/constants/pagination';
import { usePagination } from '@/hooks/usePagination';
import { TPaginationQuery } from '@/types/paginationTypes';
import { BatchService } from '@/api/Services/batch.service';
import { SubjectService } from '@/api/Services/subject.service';
import { ITeacherBio } from '@/interfaces/ITeacher';

// const statusColors = {
//     pending: "bg-gray-200 text-gray-700",
//     active: "bg-green-100 text-green-700",
//     completed: "bg-green-200 text-green-800",
// };

const TeacherHomeworkTable = () => {
    
    const navigate = useNavigate();
    
    const dispatch = useAppDispatch();
    
    const homeworks = useAppSelector((state) =>state.homeworks);
    
    const {user}=useAppSelector((state)=>state?.currentUser);

    //Filter + Search query
    const [filterValues,setFilterValues] = useState<{
            filterValue:{name:string,value:string}[],
            searchQuery:Record<string,string|number> 
        }>();

    const {nextPage,prevPage,pagination,setPagination} = usePagination(fetchHomeworks,paginationQuery.limit);

    async function fetchHomeworks(paginationQuery:TPaginationQuery) {
        if(!user){
            toast.warn('Kindly log in,Auth failed');
            return;
        }

        const res = await HomeworkService.getAllWithQuery(
            paginationQuery,
            {teacherId:user.id}
        );

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        const resData=res.data?.data;

        dispatch(storeHomeworks(resData.data));

        setPagination(
            {
                page:resData.page,
                total:resData.total,
                totalPages:resData.totalPages
            });

        return ;
    };

    useEffect(() => {
        fetchHomeworks(paginationQuery);
    }, [dispatch,filterValues.searchQuery]);

    const handleDelete = async (id: string) => { //have to reload page

        dispatch(toggleHomeworkLoading(true));
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
        });
    
        if (!result.isConfirmed) {
            dispatch(toggleHomeworkLoading(false));
            return;
        }
    
        const res = await HomeworkService.deleteHomework(id);
        
        dispatch(toggleHomeworkLoading(false));

        if (!res.success) {

            Swal.fire('Deleted!', res.error?.message, 'error');
            
            return res.success;
        }

        Swal.fire('Deleted!', 'Item deleted successfully', 'success');
        
        return true;
    };

    const handleSubjectsMapper=(subjects:IAcademicSubject[])=>{
        if(subjects.length<=0) return; //base-case

        const subjectsMapped=subjects?.map(sub => {
            return {name:sub?.name,value:sub._id}
        });

        return subjectsMapped;
    }

    useEffect(()=>{
            
            const handleFetchValues=async() => {
                
                const batchRes = await BatchService.getAllWithQuery({batchCounselor:user.id},paginationQuery) //user.id = teacher.id;
                const {data}=batchRes.data?.data;

                const batchData=data[0];
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


    const handleEdit = (homeworkId?: string) => {
        if (!homeworkId) return;
        navigate(`/teacher/dashboard/homework/edit/${homeworkId}`);
    };
    

    return (
        <div className="p-8 bg-white-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
            
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
                <Link to="add">Add Homework</Link>
            </button>
            </div>

            <Bell className="text-green-700 w-5 h-5" />
        </div>
        
        <SearchAndFilter
        
            filterField='subjectId'
            filterValues={filterValues.filterValue}
            
            searchField='title'
            placeHolder='Search using Homework title' 

            setSearchQuery={setFilterValues}

        />

        <TableComponent
            data={homeworks?.homeworks ?? []}
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
                    <Link to={`view/submissions/${homework?._id}`}>
                    <Eye className="w-4 h-4 text-green-600 hover:text-green-800 hover:underline cursor-pointer" />
                    </Link>
                    
                    
                    <Trash
                    className="w-4 h-4 text-red-600 hover:text-red-800  hover:underline cursor-pointer"
                    onClick={() => handleDelete(homework?._id)}
                    />

                    
                    <PencilLine onClick={()=>handleEdit(homework?._id)} className="w-4 h-4 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer" />
                    
                </div>
                ),
            },
            ]}
        />

        <Pagination 
            pagination={pagination} 
            onLeftClick={prevPage} 
            onRightClick={nextPage} 
            />
        
        </div>
    );
};

export default TeacherHomeworkTable;