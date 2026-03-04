import { useEffect } from 'react';
import { Pencil, Trash2, Bell } from 'lucide-react';
import { Link } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import {
  storeSchoolAcademicSubjects,
  toggleAcademicSubLoading,
} from '@/utils/Redux/Reducer/subjectReducer';
import Swal from 'sweetalert2';
import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.compo';
import { SubjectService } from '@/api/Services/subject.service';

const SubjectsPage = () => {
  //const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const subjectStore = useAppSelector((state) => state.schoolSubject);

  useEffect(() => {
    (async () => {
      const res = await SubjectService.getAll();
      const subjects = res.data?.data || [];
      dispatch(storeSchoolAcademicSubjects(subjects));
    })();
  }, [dispatch, subjectStore.loading]);

  const handleDelete = async (id: string) => {
    dispatch(toggleAcademicSubLoading(true));
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    });

    if (!result.isConfirmed) {
      return;
    }

    const res = await SubjectService.delete(id);

    if (!res.success) {
      Swal.fire('Deleted!', res.error?.message, 'error');
      return res.success;
    }

    Swal.fire('Deleted!', 'Item deleted successfully', 'success');
    dispatch(toggleAcademicSubLoading(false));
    return true;
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to="add">
          <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800">
            Add New
          </button>
        </Link>

        <Bell className="text-green-700 w-5 h-5" />
      </div>

      <SearchAndFilter />

      <TableComponent
        data={subjectStore.subjects ?? []}
        keyField="code"
        loading={subjectStore?.loading}
        emptyMessage="No Subjects found"
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Code', accessor: 'code' },
          { header: 'Class', accessor: 'className' },
          { header: 'Subject-Type', accessor: 'type' },
          { header: 'Total Marks', accessor: 'maxMarks' },
          { header: 'Department', accessor: 'department' },
          {
            header: 'Actions',
            align: 'center',
            render: (subject) => (
              <div className="flex justify-center gap-3">
                <Link to={`edit/${subject._id}`}>
                  <Pencil className="w-4 h-4 cursor-pointer hover:text-green-700" />
                </Link>
                <Trash2
                  className="w-4 h-4 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(subject._id)}
                />
              </div>
            ),
          },
        ]}
      />

      <Pagination />
    </div>
  );
};

export default SubjectsPage;
