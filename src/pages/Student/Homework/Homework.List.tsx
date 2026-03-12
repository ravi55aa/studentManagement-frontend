import { Link, useNavigate } from 'react-router-dom';
import { SendHorizontal , Eye } from 'lucide-react';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import { Pagination, TopBar } from '@/components';
import { toast } from 'react-toastify';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import StatusBadge from '@/components/fee/StatusBadge.c';
import { HomeworkService } from '@/api/Services/Teacher/homework.service';
import { storeHomeworks } from '@/utils/Redux/Reducer/homework.reducer';
import { Roles } from '@/constants/role.enum';
import { IAcademicSubject } from '@/interfaces/ISchool';

export default function FeeListPage() {
    const dispatch = useAppDispatch();
    const homeworks = useAppSelector((state) => state.homeworks);
    const navigate = useNavigate();
    

    useEffect(() => {
        (async () => {
            const user=JSON.parse(localStorage.getItem('sectionC'));
            
            if(!user){
                toast.warn('Kindly log in,Auth failed');
                return false;
            }

            const res = await HomeworkService.getAllWithQuery(Roles.Student,{batch:user.batchId});

            if (!res.success) {
                toast.error(res.error.message);
            return res.success;
            }

            const homeworksArray=res.data.data;
            dispatch(storeHomeworks(homeworksArray));
        })();
    }, [dispatch]);

    const handleSubmit = async (id: string) => {
        console.log('submit');
    };


    return (
        <div className="p-8 bg-white-100 min-h-screen">
        
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

        <Pagination />
        </div>
    );
}
