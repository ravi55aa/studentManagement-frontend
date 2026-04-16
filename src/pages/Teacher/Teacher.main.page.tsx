import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { IGetAllTeachers, ITeacherBio } from '@/interfaces/ITeacher';
import { Eye, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storeTeachers } from '@/utils/Redux/Reducer/teacher.reducer';
import TeacherDetailsModal from './ViewTeacher.page';
import profileImg from '@/assets/profile_image.jpg';
import { TableComponent } from '@/components/Table.Component';
import SearchAndFilter from '@/components/SearchAndFilter';
import { Pagination } from '@/components';
import { TeacherService } from '@/api/Services/teacher.service';
import { paginationQuery } from '@/constants/pagination';

const TeachersListPage = () => {
  const dispatch = useAppDispatch();
  const teachersStore = useAppSelector((state) => state.teacher);
  const [isOpen, setIsOpen] = useState(false);
  const [paginationUtils, setPaginationUtils] = useState({
    page:0,total:0,totalPages:0
  });
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacherBio | null>(null);

  const handleOpen = (teacher: ITeacherBio) => {
    setSelectedTeacher(teacher);
    setIsOpen(true);
  };

  useEffect(() => {
    (async () => {
      
      const res = await TeacherService.getAll(paginationQuery);

      if (!res.success) {
        toast.warn(res.error.message);
        return;
      }

      const resData = res.data.data;
      
      const {teacherBio, teachersSchoolData} = resData.data[0];

      setPaginationUtils(
        { page:resData.page,
          total:resData.total,
          totalPages:resData.totalPages
        });

      const result: IGetAllTeachers = { teacherBio, teachersSchoolData };
      dispatch(storeTeachers(result));

      return true;
    })();
  }, [dispatch]);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">

          <Link
            to="add"
            className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800"
          >
            Add Teacher
          </Link>
        </div>

        {/* <Bell className="w-5 h-5 text-green-700 cursor-pointer" /> */}
      </div>

      <SearchAndFilter />

      <TableComponent
        data={teachersStore?.bio ?? []}
        keyField="email"
        loading={teachersStore?.loading}
        emptyMessage="No teachers found"
        columns={[
          {
            header: 'Name',
            render: (teacher) => (
              <div className="flex items-center gap-3">
                <img
                  src={typeof teacher.profilePhoto == 'string' ? teacher.profilePhoto : profileImg}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {teacher.firstName}
              </div>
            ),
          },
          { header: 'Email', accessor: 'email' },
          { header: 'Qualification', accessor: 'qualification' },
          {
            header: 'Experience',
            accessor: 'experience',
            format: (value: string) => value + ' Years',
          },
          { header: 'Gender', accessor: 'gender' },
          {
            header: 'Actions',
            align: 'center',
            render: (teacher) => (
              <div className="flex justify-center gap-3">
                <Link to={`edit/${teacher._id}`}>
                  <Pencil className="w-4 h-4 hover:text-green-600 cursor-pointer" />
                </Link>
                <Eye
                  onClick={() => handleOpen(teacher)}
                  className="w-4 h-4 hover:text-green-600 cursor-pointer"
                />
              </div>
            ),
          },
        ]}
      />

      <TeacherDetailsModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        teacher={selectedTeacher}
      />

      {/* ===== Pagination ===== */}
      <Pagination
      page={paginationUtils?.page} 
      totalPages={paginationUtils?.totalPages}
      total={paginationUtils?.total} 
      />
    </div>
  );
};

export default TeachersListPage;
