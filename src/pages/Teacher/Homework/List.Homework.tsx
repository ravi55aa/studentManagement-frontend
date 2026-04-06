import { Link, useNavigate } from 'react-router-dom';
import { Bell, Eye, PencilLine, Trash } from 'lucide-react';
import { useEffect } from 'react';

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

// const statusColors = {
//     pending: "bg-gray-200 text-gray-700",
//     active: "bg-green-100 text-green-700",
//     completed: "bg-green-200 text-green-800",
// };

const TeacherHomeworkTable = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const homeworks = useAppSelector((state) =>state.homeworks);
    const {user}=useAppSelector((state)=>state.currentUser);

    useEffect(() => {
        (async () => {
            if(!user){
                toast.warn('Kindly log in,Auth failed');
                return false;
            }

            const res = await HomeworkService.getAllWithQuery(
                Roles.Teacher,
                {teacherId:user.id}
            );

            if (!res.success) {
                toast.error(res.error.message);
                return res.success;
            }

            const homeworksArray=res.data.data;
            dispatch(storeHomeworks(homeworksArray));
        })();
    }, [dispatch]);

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
    
        const res = await HomeworkService.delete(Roles.School,id);
        
        dispatch(toggleHomeworkLoading(false));
        if (!res.success) {
            Swal.fire('Deleted!', res.error?.message, 'error');
            return res.success;
        }

        Swal.fire('Deleted!', 'Item deleted successfully', 'success');
        
        return true;
    };


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
        
        <SearchAndFilter />

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

        <Pagination />
        </div>
    );
};

export default TeacherHomeworkTable;