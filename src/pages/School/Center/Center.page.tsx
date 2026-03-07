import { useState, useEffect } from 'react';
import { Pencil, Ban, Trash2, Bell } from 'lucide-react';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import { setCenters, toggleCenterLoading } from '@/utils/Redux/Reducer/centerReducer';
import { storeAddress } from '@/utils/Redux/Reducer/address.reducer';
import { IAddress } from '@/interfaces/IRegister';
import Swal from 'sweetalert2';
import { deleteSwal } from '@/utils/swal';
import { Pagination } from '@/components';
import SearchAndFilter from '@/components/SearchAndFilter';
import { TableComponent } from '@/components/Table.Component';
import { AddressRoute } from '@/constants/routes.contants';
import { CenterService } from '@/api/Services/center.service';
//import { useAppNavigate } from "@/hooks/navigate.hook";

const CentersPage = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const centerReduxStore = useAppSelector((store) => store.center);
  //const addressReduxStore=useAppSelector((store)=>store.address);

  useEffect(() => {
    (async () => {
      //All Centers fetch

      const fetchAllCenters = await CenterService.getAll();

      //All addresses fetch
      const config2: HandleApiOptions<null> = {
        method: 'get',
        endPoint: AddressRoute.getAll,
        payload: null,
        headers: { role: 'School' },
      };

      const fetchedAllAddress = await handleApi<null, IAddress[]>(config2);
      dispatch(storeAddress(fetchedAllAddress?.data?.data));
      dispatch(setCenters(fetchAllCenters.data.data));

      setSearch('');
      setError('');
    })();
  }, [dispatch]);

  /* ---------- Search Handling ---------- */
  const filteredCenters = centerReduxStore?.centers?.filter(
    (center) =>
      center?.name.toLowerCase().includes(search.toLowerCase()) ||
      center?.code.toLowerCase().includes(search.toLowerCase()),
  );

  // const filteredAddress=addressReduxStore?.addresses?.filter((address)=>
  //     filteredCenters?.forEach((centers)=>centers._id==address.userId)
  // );

  /* ---------- Action Handlers ---------- */

  const handleDisable = (id: string) => {
    console.log('Disable center:', id);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteSwal();

    if (!result.isConfirmed) return;

    const res = await CenterService.delete(id);

    if (!res.success) return res.success;

    console.log(error);
    Swal.fire('Deleted!', 'Item deleted successfully', 'success');
    dispatch(toggleCenterLoading());

    return res.success;
  };

  // const getAddressById = (id: string) => {
  //     const address=addressReduxStore?.addresses?.filter(
  //         (addr) =>addr.userId === id
  //     );

  //     return address;
  // };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          type="button"
          className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800"
        >
          <Link to="add"> Add New </Link>
        </button>

        <Bell className="text-green-700 w-5 h-5" />
      </div>

      <SearchAndFilter />

      <TableComponent
        data={filteredCenters ?? []}
        keyField="_id"
        loading={centerReduxStore?.loading}
        emptyMessage="No Centers found"
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Code', accessor: 'code' },
          { header: 'Current Strength', accessor: 'currentStrength' },
          { header: 'Total Strength', accessor: 'totalCapacity' },
          {
            header: 'Actions',
            align: 'center',
            render: (center) => (
              <div className="flex justify-center gap-3">
                <Link to={`edit/${center._id}`}>
                  <Pencil className="w-4 h-4 hover:text-green-600 cursor-pointer" />
                </Link>
                <Ban className="w-4 h-4" onClick={() => handleDisable(center?._id)} />
                <Trash2 className="w-4 h-4" onClick={() => handleDelete(center?._id)} />
              </div>
            ),
          },
        ]}
      />

      {/* ---------- Mobile Card View ---------- */}
      <div className="md:hidden space-y-4">
        {filteredCenters?.length === 0 ? (
          <p className="text-center text-gray-500">No centers found</p>
        ) : (
          filteredCenters?.map((center, index) => (
            <div key={index} className="border rounded-md p-4 shadow-sm">
              <div className="font-medium">{center?.name}</div>
              <div className="text-sm text-gray-600">{center?.code}1fdsfds</div>
              <div className="text-sm">
                {center.code}, {center?.code}2fdd
              </div>
              <div className="text-sm mb-3">Currency: {center?.code}3safd</div>

              <div className="flex gap-4 text-gray-600">
                <Link to="edit/:id">
                  <Pencil className="w-4 h-4" />
                </Link>
                <Ban className="w-4 h-4" onClick={() => handleDisable(center?._id)} />
                <Trash2 className="w-4 h-4" onClick={() => handleDelete(center?._id)} />
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default CentersPage;
