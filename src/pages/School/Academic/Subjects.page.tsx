import { useEffect, useState } from 'react';
import { Pencil, Trash2, Bell } from 'lucide-react';
import { Link } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/hooks/useStoreHooks';
import Swal from 'sweetalert2';
import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import { SubjectService } from '@/api/Services/subject.service';
import { PaginationDemo } from '@/components/Pagination.c';
import { department_filter_values } from '@/constants/deparment';
import {
  storeSchoolAcademicSubjects,
  toggleAcademicSubLoading,
} from '@/utils/Redux/Reducer/subjectReducer';

const SubjectsPage = () => {
  
  //search + filter
    const [filterValues,setFilterValues] = useState<{
        filterValue:{name:string,value:string}[],
        searchQuery:Record<string,string|number> 
    }>(
        {
            filterValue:department_filter_values,
            searchQuery:{}
        }
  );

  const dispatch = useAppDispatch();
  const subjectStore = useAppSelector((state) => state.schoolSubject);

  useEffect(() => {
    
    (async () => {

      const res = await SubjectService.getAllWithQuery({...filterValues?.searchQuery});

      const subjects = res.data?.data || [];

      dispatch(storeSchoolAcademicSubjects(subjects || []));

    })();

  }, [dispatch, subjectStore.loading,filterValues?.searchQuery]);

  const handleDelete = async (id: string) => {
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
    
    dispatch(toggleAcademicSubLoading(true));
    const res = await SubjectService.deleteSubject(id);
    dispatch(toggleAcademicSubLoading(false));

    if (!res.success) {
      Swal.fire('Deleted!', res.error?.message, 'error');
      return res.success;
    }

    Swal.fire('Deleted!', 'Item deleted successfully', 'success');
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

      <SearchAndFilter
            filterField='department'
            searchField='description'
            placeHolder='Search using subject description' 
            setSearchQuery={setFilterValues}
            
            filterValues={filterValues?.filterValue}
        />

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

      {/* <Pagination /> */}
      {subjectStore.subjects?.length && <PaginationDemo /> }
    </div>
  );
};

export default SubjectsPage;
