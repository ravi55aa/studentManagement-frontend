import { IHomework } from "@/interfaces/IHomework";
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Eye, PencilLine, Trash } from 'lucide-react';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import { Pagination } from '@/components';
import { toast } from 'react-toastify';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import StatusBadge from '@/components/fee/StatusBadge.c';
import { HomeworkService } from '@/api/Services/Teacher/homework.service';
import { storeHomeworks } from '@/utils/Redux/Reducer/homework.reducer';
import { Roles } from '@/constants/role.enum';
import { IAcademicSubject } from '@/interfaces/ISchool';

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
                {batch:user.batchId}
            );

            if (!res.success) {
                toast.error(res.error.message);
                return res.success;
            }

            const homeworksArray=res.data.data;
            dispatch(storeHomeworks(homeworksArray));
        })();
    }, [dispatch]);

    const handleEdit = (homeworkId?: string) => {
        if (!homeworkId) return;
        navigate(`/teacher/homework/edit/${homeworkId}`);
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
                    <Link to={`view/submissions/${homework?._id}`}>
                    <Eye className="w-4 h-4 text-green-600 hover:text-green-800 hover:underline cursor-pointer" />
                    </Link>
                    
                    <Link to={`view/submissions`}>
                    <Trash 
                    className="w-4 h-4 text-red-600 hover:text-red-800  hover:underline cursor-pointer"
                    onClick={() => handleEdit(homework?._id)}
                    />
                    </Link>

                    <Link to={`view/submissions`}>
                    <PencilLine className="w-4 h-4 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer" />
                    </Link>
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