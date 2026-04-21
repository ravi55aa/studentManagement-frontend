import  { useEffect, useState } from 'react'
import { CourseService } from '@/api/Services/course.service';
import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import { Roles } from '@/constants/role.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { storeSchoolAcademicCourses, storeSchoolAcademicCoursesMeta, toggleAcademicCourseLoading } from '@/utils/Redux/Reducer/courses.reducer';
import { Bell, Eye  } from 'lucide-react';
import { toast } from 'react-toastify';
import { ICourseForm } from '@/interfaces/ICourseForm';
import { IUploadedDoc } from '@/interfaces/IRegister';
import CourseViewModal from '@/components/ViewCourse.component';
import NotificationModal from '@/components/Notification/component/NotificationModal';
import { PaginationDemo } from '@/components/Pagination.c';

const StudentCourse = () => {
    const dispatch = useAppDispatch();
    const { courses, loading } = useAppSelector((state) => state.courses);
    const [ viewCourse, setViewCourse ] = useState<ICourseForm>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Notification
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                dispatch(toggleAcademicCourseLoading(true));
        
                const res = await CourseService.getAll();
        
                if (!res.success) {
                toast.error(res.error.message);
                return ;
                }
        
                const { courses, courses_meta } = res.data.data;
                dispatch(storeSchoolAcademicCourses(courses));
                dispatch(storeSchoolAcademicCoursesMeta(courses_meta));
            } catch (err) {
                toast.error(err.message);
            } finally {
                dispatch(toggleAcademicCourseLoading(false));
            }
            };
        
            fetchCourses();
        }, [dispatch]);

    const handleView = async (id: string) => {
    try {
        dispatch(toggleAcademicCourseLoading(true));

        const res = await CourseService.getById( id);

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        if (!res.data.data) return;

        const { course, meta } = res.data.data;

        const courseData: ICourseForm = {
            ...course,
            ...meta,
            maxStudents: Number(course.maxStudents),
            enrollmentOpen: Boolean(course.enrollmentOpen),
            attachments: meta.attachments as IUploadedDoc[],
        };

        setViewCourse(courseData);
        setIsModalOpen(true); 
    } catch (err) {
        toast.error(err.message);
    } finally {
        dispatch(toggleAcademicCourseLoading(false));
    }
};


    return (
    <div className="p-6 bg-white min-h-screen">
      {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
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
            data={courses ?? []}
            keyField="_id"
            loading={loading}
            emptyMessage="No teachers found"
            columns={[
            {
                header: 'Name',
                accessor: 'name',
            },
            { header: 'Code', accessor: 'code' },
            {
                header: 'duration',
                accessor: 'duration',
                format: (value: { value: string; unit: string }) => value?.value + ' ' + value?.unit,
            },
            {
                header: 'Actions',
                align: 'center',
                render: (course) => (
                <div className="flex justify-center gap-3">
                    
                    <Eye onClick={()=>handleView(course._id)} className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        

                </div>
                ),
            },
            ]}
        />

        <PaginationDemo/>

        {/* View Modal */}
        <CourseViewModal viewCourse={viewCourse} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default StudentCourse