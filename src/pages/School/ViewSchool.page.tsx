import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Lock, Trash } from 'lucide-react';
import  { useEffect, useState } from 'react';
import { IResetPassword } from '@/interfaces/ISchool';

import { handleValidationOF } from '@/validation/validateFormData';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';

import { passwordSchema } from '@/validation/school.validator';

import {
  ISubjectReducer,
  setSchool_MDA_Data,
  toggleMDALoading,
} from '@/utils/Redux/Reducer/school.reducer';
import { SchoolService } from '@/api/Services/school.service';
import { Card, PasswordResetModal} from '@/components/School/card';
import { ProfileAddressComponent, ProfileDocumentsComponent } from '@/components/Settings.components';
import { useNavigate } from 'react-router-dom';
import { Roles } from '@/constants/role.enum';

const SchoolSettingsPage = () => {
  /**
   * USE-STATE
   */
  const [showOtp, setShowOtp] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const school = useAppSelector((state) => state.schoolMDA);
  const {user}=useAppSelector((state) => state.currentUser);

  const [utils, setUtils] = useState({
    error: '',
    loading: false,
    isOpen: false,
    isOpenDocument: false,
    isOpenUploadDocument: false,
  });

  const navigate = useNavigate();

  /**
   * Redux
   */
  const dispatch = useAppDispatch();
  const { meta, documents, address, loading } = useAppSelector((state) => state.schoolMDA);
  //handle image
  const [image, setImage] = useState({
    preview: meta?.profile ?? '/school/profile_image.jpg',
    file: '',
  });

  /**
   * USE-EFFECT
   */
  useEffect(() => {
    (async () => {
      const res = await SchoolService.view();

      if (!res.data) {
        toast.warn('Kindly re-login again');
        return;
      }

      const { meta, documents, address } = res.data.data;

      const wrapper: ISubjectReducer = {
        meta,
        documents,
        address,
        loading: false,
        error: null,
      };  

      dispatch(setSchool_MDA_Data(wrapper));

      return true;
    })();
  }, [dispatch, loading]);

  /**
   * School_Meta
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // preview image
    const imageURL = URL.createObjectURL(file);
    setImage({ preview: imageURL, file: file });
  };

  const handleUpdateProfile = async () => {
    // dispatch(toggleMDALoading());

    const formData = new FormData();
    formData.append('profile', image.file);

    const res = await SchoolService.updateMeta(user.id, formData);
    // dispatch(toggleMDALoading());

    if (!res.success) {
      setUtils({
        error: res.error?.message || res.data?.error,
        loading: false,
        isOpen: false,
        isOpenDocument: false,
        isOpenUploadDocument: false,
      });
      setImage((prev) => ({ ...prev, preview: '/school/profile_image.jpg' }));
      return res.success;
    }
    setImage((prev) => ({ ...prev, preview: '/school/profile_image.jpg' }));

    return res.success;
  };

  const handlePasswordChange = async (passwords: IResetPassword) => {
    const userId = address.userId;

    const isValid = handleValidationOF(passwordSchema, passwords);

    if (!isValid.success) {
      toast.warn(isValid.error.issues[0]?.message);
      return false;
    }
    const data = { role: 'School', password1: passwords.pass1, password2: passwords.pass2 };

    setShowOtp(false);

    const res = await SchoolService.resetPassword(userId, data);

    setShowResetModal(false);
    if (!res.success) {
      toast.error('Cant update password');
      return res.success;
    }

    toast.success('Password Change successfully');
    return res.success;
  };


  //delete school
  const handleDeleteSchool = async () => {
    const deleteSchool = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    });

    if (!deleteSchool.isConfirmed) {
      return;
    }
    const id = school.meta._id;

    const res = await SchoolService.deleteSchool(id);

    if (!res.success) {
      toast.error(res.error.message);
      return res.success;
    }
    localStorage.clear();
    navigate('/login');
    return res.success;
  };

  return (
    <div className="p-6 bg-white min-h-screen max-w-6xl space-y-6">
      {/* ================= SCHOOL PROFILE ================= */}

      <Card title="School Profile">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="relative">
            <img
              src={image.preview !== '/school/profile_image.jpg' ? image?.preview : meta?.profile}
              className="w-24 h-24 rounded-full border object-cover"
            />
            <input
              type="file"
              onChange={(e) => handleImageChange(e)}
              placeholder="change"
              className="absolute w-20 text-center h-7 text-sm bottom-0 right-0 bg-green-700 p-1 rounded-full text-white"
            />

            {/* buttons */}
            {image.preview !== '/school/profile_image.jpg' && (
              <div className="flex gap-3">
                {/* ADD */}
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-600 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700 m-1 transition"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>

                {/* REMOVE */}
                <button
                  onClick={() => setImage({ preview: '/school/profile_image.jpg', file: null })}
                  className="bg-red-600 text-white px-4 me-25 py-1 rounded-full text-sm m-1 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-2">
            <p className="text-gray-800 font-medium text-lg">{meta?.schoolName}</p>

            <p className="text-sm text-gray-500">{meta?.email}</p>

            <button
              onClick={() => setShowResetModal(true)}
              className="mt-3 inline-flex items-center gap-2 text-green-700 text-sm font-medium hover:underline"
            >
              <Lock size={16} />
              Change Password
            </button>
          </div>
        </div>
      </Card>

      {/* ================= EMAIL VERIFICATION ================= */}

      {showOtp && (
        <Card title="Verify Email">
          <p className="text-sm text-gray-500 mb-4">We’ll send an OTP to your registered email.</p>

          <button className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800">
            Send OTP
          </button>
        </Card>
      )}

      {/* ================= ADDRESS ================= */}
      <ProfileAddressComponent 
        role={Roles.School}
        loading={loading} 
        utils={utils} setUtils={setUtils}  
      />

      {/* ================= DOCUMENTS ================= */}
      <ProfileDocumentsComponent 
        role={Roles.School}
        loading={loading} 
        utils={utils} 
        setUtils={setUtils}  
      />

      {/* ================= DELETE SCHOOL ================= */}
      <div className="flex justify-end">
        <button
          onClick={handleDeleteSchool}
          className="ml-5 mt-3 inline-flex border px-5 py-2 hover:bg-red-950 hover:text-white items-center gap-2 text-red-700 text-sm font-medium hover:underline"
        >
          <Trash size={16} />
          Delete School
        </button>
      </div>

      {/* ================= PASSWORD RESET MODAL ================= */}
      
      {showResetModal && (
        <PasswordResetModal
          onClose={() => setShowResetModal(false)}
          onSubmit={(passwords: IResetPassword) => handlePasswordChange(passwords)}
        />
      )}
    </div>
  );
};

export default SchoolSettingsPage;