import { useEffect, useState } from 'react';
import SearchAndFilter from '@/components/SearchAndFilter';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { SchoolService } from '@/api/Services/school.service';
import { toast } from 'react-toastify';
import { Eye } from 'lucide-react';



import { ISchoolFormData } from '@/interfaces/IRegister';
import { TableComponent } from '@/components/Table.Component';
import { SchoolViewModal } from '@/components/School/viewSchoolModal';
import { Pagination } from '@/components';
import { toggleSchoolLoading } from '@/utils/Redux/Reducer/allSchool.redcuer';
import { setSchools, updateSchoolStatusLocal } from '@/utils/Redux/Reducer/schools.reducer';
import { schoolStatus } from '@/types/types';

const AdminSchoolList = () => {
    const dispatch = useAppDispatch();
    const { schools, loading } = useAppSelector((state) => state.allSchool);

    const [viewSchool, setViewSchool] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    useEffect(() => {
        const fetchSchools = async () => {
        try {
            dispatch(toggleSchoolLoading());

            const res = await SchoolService.getAllSchool();

            if (!res.success) {
            toast.error(res.error.message);
            return;
            }

            dispatch(setSchools(res.data.data));
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            dispatch(toggleSchoolLoading());
        }
        };

        fetchSchools();
    }, []);
    
    const handleView = async (id: string) => {
        try {
        dispatch(toggleSchoolLoading());

        const res = await SchoolService.getById(id);

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        setViewSchool(res.data.data);
        setIsModalOpen(true);
        } catch (err: any) {
        toast.error(err.message);
        } finally {
        dispatch(toggleSchoolLoading());
        }
    };

    const handleStatusChange = async (id: string, status: string|schoolStatus) => {
        try {
        const res = await SchoolService.updateStatus(id, status as schoolStatus);

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        dispatch(updateSchoolStatusLocal({ id, status }));
        toast.success('Status updated');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen">
        <SearchAndFilter />

        <TableComponent
            data={schools}
            keyField="_id"
            loading={loading}
            emptyMessage="No schools found"
            columns={[
            {
                header: '#',
                render: (_, index:number) => index + 1,
            },
            {
                header: 'School Name',
                accessor: 'schoolName',
            },
            {
                header: 'Admin',
                accessor: 'adminName',
            },
            {
                header: 'Status',
                render: (school:ISchoolFormData) => (
                <select
                    className={
                        school.status === 'verified'
                            ? 'text-green-600'
                            : school.status === 'blocked'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }
                    value={school.status}
                    onChange={(e) =>
                    handleStatusChange(school._id, e.target.value)
                    }

                >
                    <option value="verify">Verify</option>
                    <option value="verified">Verified</option>
                    <option value="blocked">Blocked</option>
                </select>
                ),
            },
            {
                header: 'Actions',
                align: 'center',
                render: (school) => (
                <Eye
                    onClick={() => handleView(school._id)}
                    className="w-4 h-4 cursor-pointer hover:text-green-700"
                />
                ),
            },
            ]}
        />

        <Pagination />

        {/* Modal */}
        <SchoolViewModal
            viewSchool={viewSchool}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
        </div>
    );
};

export default AdminSchoolList;