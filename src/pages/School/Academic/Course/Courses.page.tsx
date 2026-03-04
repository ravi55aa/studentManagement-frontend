import { Pencil, Ban, Trash2, Bell } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import Swal from 'sweetalert2';
import {
  storeSchoolAcademicCourses,
  storeSchoolAcademicCoursesMeta,
  toggleAcademicCourseLoading,
} from '@/utils/Redux/Reducer/courses.reducer';
import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.compo';
import { CourseService } from '@/api/Services/course.service';
import { toast } from 'react-toastify';

const CourseListPage = () => {
  const dispatch = useAppDispatch();
  const { courses, loading } = useAppSelector((state) => state.courses);

  // const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("");
  //const [courses, setCourses] = useState(dummy_courses);

  //Fetches Courses from Backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        dispatch(toggleAcademicCourseLoading(true));

        const res = await CourseService.getAll();

        if (!res.success) {
          throw new Error(res.error.message);
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

  //   HandleDelete */
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
    const deletedDoc = await CourseService.delete(id);

    if (!deletedDoc.success) {
      Swal.fire('Deleted!', deletedDoc.error.message, 'error');
      return deletedDoc.success;
    }

    Swal.fire('Deleted!', 'Item deleted successfully', 'success');
    dispatch(toggleAcademicCourseLoading(false));
    return true;
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <Link to="add">
          <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800">
            Add New
          </button>
        </Link>

        <Bell className="w-5 h-5 text-green-700 cursor-pointer" />
      </div>

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
                <Link to={`edit/${course._id}`}>
                  <Pencil className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                </Link>

                <Ban className="w-4 h-4 hover:text-yellow-600 cursor-pointer" />

                <Trash2
                  onClick={() => handleDelete(course?._id)}
                  className="w-4 h-4 hover:text-red-600 cursor-pointer"
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

export default CourseListPage;

// const handleChange = (
//     e: React.ChangeEvent< HTMLSelectElement>
//     ) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//         ...prev,
//         [name]: value,
//     }));
// };

/*
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {


            // basic validation
            if (!form.name || !form.code || !form.program) {
            setError("Please fill all required fields");
            return;
            }

            const config = {
                method: "post",
                endPoint: "/school/academics/courses/add",
                payload: form,
                headers: { role: "school" },
            };

            const res = await handleApi(config);

            if (!res.success) {
            throw new Error(res.error.message);
            }

            setForm({
            name: "",
            program: "",
            code: "",
            duration: "",
            });

            setError(null);

            // refresh list
            //setCourses((prev) => [res.data.data, ...prev]);
        } catch (err) {
            setError(err.message || "Unable to save course");
        } finally {

        }
    };


    ui-display courses filteredOne
    const filteredCourses = courses?.filter((course) => {
        const matchesSearch =
            course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase());

        const matchesFilter = filter ? course?.code === filter : true;

        return matchesSearch && matchesFilter;
    });



const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

*/
