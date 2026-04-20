import { useEffect } from 'react';
import { Pencil, Trash2, Bell } from 'lucide-react';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import Swal from 'sweetalert2';
import {
  storeSchoolAcademicYears,
  toggleAcademicLoading,
} from '@/utils/Redux/Reducer/schoolYearReducer';
import { Pagination } from '@/components';
import { TableComponent } from '@/components/Table.Component';
import SearchAndFilter from '@/components/SearchAndFilter';
import { AcademicYearService } from '@/api/Services/year.service';
import { toast } from 'react-toastify';
import { paginationQuery } from '@/constants/pagination';
import { usePagination } from '@/hooks/usePagination';


const AcademicYearsPage = () => {
  //const [search, setSearch] = useState("");
  //const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const { years, loading } = useAppSelector((state) => state.schoolYear);

  const {pagination,setPagination,prevPage,nextPage,}= usePagination(fetchAcademicYears,8);

  async function fetchAcademicYears() {
    dispatch(toggleAcademicLoading(true));
    const res = await AcademicYearService.getAll(paginationQuery);

    if (!res.success) {
      return 
    }

    const resData = res?.data?.data;

    dispatch(toggleAcademicLoading(false));
    
    dispatch(storeSchoolAcademicYears(resData?.data));

    //setPagination
    setPagination({page:resData.page,total:resData.total,totalPages:resData.totalPages}); 
  };

  useEffect(() => {
    fetchAcademicYears();
  }, [dispatch]);

  /* ---------- Filtering ---------- */
  // const filteredYears =years.filter(
  //     (year) =>
  //     year?.year?.includes(search) ||
  //     year?.code?.toLowerCase().includes(search.toLowerCase())
  // );

  /* ---------- Handlers ---------- */
  const handleDelete = async (id: string) => {
    dispatch(toggleAcademicLoading(true));

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    });

    if (!result.isConfirmed) {
      dispatch(toggleAcademicLoading(false));
      return;
    }

    const res = await AcademicYearService.deleteAcademicYear(id);

    if (!res.success) {
      toast.error(res.error.message);
      return res.success;
    }
    await AcademicYearService.getAll(paginationQuery);

    toast.success('Deleted Successfully');
    dispatch(toggleAcademicLoading(false));
    return true;
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800">
          <Link to="add">Add New</Link>
        </button>

        <Bell className="text-green-700 w-5 h-5" />
      </div>

      <SearchAndFilter />

      <TableComponent
        data={years ?? []}
        keyField="code"
        loading={loading}
        emptyMessage="No teachers found"
        columns={[
          { header: 'Academic Year', accessor: 'year' },
          { header: 'Code', accessor: 'code' },
          {
            header: 'Start Date',
            accessor: 'startDate',
            format: (value: string) => value.slice(0, 10),
          },
          {
            header: 'End Date',
            accessor: 'endDate',
            format: (value: string) => value.slice(0, 10),
          },
          {
            header: 'Actions',
            align: 'center',
            render: (year) => (
              <div className="flex justify-center gap-3">
                <Link to={`edit/${year._id}`}>
                  <Pencil className="w-4 h-4 cursor-pointer hover:text-green-700" />
                </Link>
                <Trash2
                  className="w-4 h-4 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(year._id)}
                />
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

export default AcademicYearsPage;
