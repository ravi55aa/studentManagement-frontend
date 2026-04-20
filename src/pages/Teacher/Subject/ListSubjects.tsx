import  { useEffect, useState } from 'react'
import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import { Roles } from '@/constants/role.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { storeSchoolAcademicSubjects,toggleAcademicSubLoading } from '@/utils/Redux/Reducer/subjectReducer';
import { Bell, Eye  } from 'lucide-react';
import { toast } from 'react-toastify';
import { SubjectService } from '@/api/Services/subject.service';
import { IAcademicSubject } from '@/interfaces/ISchool';
import { TeacherService } from '@/api/Services/teacher.service';
import SubjectViewModal from '@/components/ViewSubjectModal';

const TeacherSubjects = () => {
    const dispatch = useAppDispatch();

    const { subjects, loading } = useAppSelector((state) => state.schoolSubject);

    const { user } = useAppSelector((state) => state.currentUser);

    const [ viewSubject, setViewSubject ] = useState<IAcademicSubject>();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                dispatch(toggleAcademicSubLoading(true));
                const resTeacher=await TeacherService.get(Roles.Teacher,user.id);

                if(!resTeacher){
                    toast.error(resTeacher.error.message);
                    return resTeacher.success;
                }

                const {teacher}=resTeacher.data?.data;
                const subjectArray:IAcademicSubject[]=[];
        
                for(let _subjectId of teacher?.assignedSubjects){
                    const res = await SubjectService.get(Roles.Student,_subjectId?._id);

                    if (!res.success) {
                        toast.error(res.error.message);
                        return;
                    }

                    const subject:IAcademicSubject = res.data.data;
                    subjectArray.push(subject);
                }
        
        
                dispatch(storeSchoolAcademicSubjects(subjectArray));
                
            } catch (err) {
                toast.error(err.message);
            } finally {
                dispatch(toggleAcademicSubLoading(false));
            }
            };
        
            fetchSubjects();
        }, [dispatch]);

    const handleView = async (id: string) => {
    try {
        dispatch(toggleAcademicSubLoading(true));

        const res = await SubjectService.get(Roles.Teacher, id);

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        if (!res.data.data) return;

        const subject = res.data.data;

        setViewSubject(subject);
        setIsModalOpen(true); 
    } catch (err) {
        toast.error(err.message);
    } finally {
        dispatch(toggleAcademicSubLoading(false));
    }
    };


    return (
    <div className="p-6 bg-white min-h-screen">
      {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
            <p></p>
            <Bell className="w-5 h-5 text-green-700 cursor-pointer" />
        </div>

        <SearchAndFilter />

        <TableComponent
            data={subjects ?? []}
            keyField="_id"
            loading={loading}
            emptyMessage="No teachers found"
            columns={[
            {header: 'Name',accessor: 'name',},
            {header: 'Code', accessor: 'code' },
            {header: 'Department',accessor: 'department',},
            {header: 'Type',accessor: 'type',},

            {
                header: 'Actions',
                align: 'center',
                render: (subject) => (
                <div className="flex justify-center gap-3">
                    
                    <Eye onClick={()=>handleView(subject._id)} className="w-4 h-4 hover:text-green-700 cursor-pointer" />

                </div>
                ),
            },
            ]}
        />

        {/* <Pagination /> */}

        {/* View Modal */}
        <SubjectViewModal viewSubject={viewSubject} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> 
        </div>
    );
}

export default TeacherSubjects