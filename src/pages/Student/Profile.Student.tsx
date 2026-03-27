import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Lock, Trash } from 'lucide-react';
import  React, { ChangeEvent, useEffect, useState } from 'react';
import { IResetPassword } from '@/interfaces/ISchool';

import { handleValidationOF } from '@/validation/validateFormData';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';

import { passwordSchema } from '@/validation/school.validator';

import { SchoolService } from '@/api/Services/school.service';
import { Card, PasswordResetModal} from '@/components/School/card';
import { ProfileAddressComponent, ProfileDocumentsComponent } from '@/components/Settings.components';
import { useNavigate } from 'react-router-dom';
import { StudentService } from '@/api/Services/Student/student.service';
import { IUserProfile, storeCurrentUserProfile,toggleCurrentUserProfileLoading } from '@/utils/Redux/Reducer/currentUserProfile.reducer';
import { Roles } from '@/constants/role.enum';
import { AddressService } from '@/api/Services/address.service';
import { DocumentService } from '@/api/Services/document.service';
import { IAddress, IDocument } from '@/interfaces/IRegister';

const StudentSettingsPage = () => {
    /**
     * USE-STATE
     */
    const [showOtp, setShowOtp] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const currentUser = useAppSelector((state) => state.currentUser);
    const [userInfo,setUserInfo] = useState<{address:IAddress|{},documents:IDocument[]|{}}>({address:{},documents:{}});

    const {user,loading} = useAppSelector((state) => state.currentUserProfile);

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
    
    //handle image
    const [image, setImage] = useState({
        preview: user?.profile ?? '/school/profile_image.jpg',
        file: '',
    });

    /**
     * USE-EFFECT
     */
    useEffect(() => {
        const user=currentUser.user;
        
        if(!user.id){
            toast.warn('No user, Kindly re-login');
            return;
        }
        
        (async () => {
        
        const res = await StudentService.get(Roles.Student,user.id);
        
        const resAddress = await AddressService.get(Roles.Student,user.id);
        const resDocument = await DocumentService.get(Roles.Student,user.id);
        
        if (!res.success ) {
            toast.warn(res.error?.message);
            return res.success;
        }


        const profile = res.data?.data;
        const _userProfile:IUserProfile={
            email:profile.email,
            name:profile.name,
            profile:typeof profile.profile=='string' && profile.profile,
            id:profile._id,
            role:Roles.Student
        }

        const address=resAddress?.data?.data;
        const documents=resDocument?.data?.data;

        setUserInfo({address,documents});

        dispatch(storeCurrentUserProfile(_userProfile));

        return res.success;
        })();
    }, [dispatch]);

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
        dispatch(toggleCurrentUserProfileLoading());
        const id = user.id;
        const formData = new FormData();
        formData.append('profile', image.file);

        const res = await StudentService.update(Roles.Student,id, formData);
        dispatch(toggleCurrentUserProfileLoading());

        if (!res.success) {
        setUtils({
            error: res.error?.message || res.data?.error,
            loading: false,
            isOpen: false,
            isOpenDocument: false,
            isOpenUploadDocument: false,
        });
        setImage((prev) => ({ ...prev, preview: '/school/profile_image.jpg' }));
        toast.error(res.error?.message);
        return res.success;
        }
        
        setImage((prev) => ({ ...prev, preview: '/school/profile_image.jpg' }));

        return res.success;
    };

    const handlePasswordChange = async (passwords: IResetPassword) => {
        const userId = user.id;

        const isValid = handleValidationOF(passwordSchema, passwords);

        if (!isValid.success) {
        toast.warn(isValid.error.issues[0]?.message);
        return false;
        }
        const data = { role: Roles.Student, password1: passwords.pass1, password2: passwords.pass2 };

        setShowOtp(false);

        const res = await SchoolService.resetPassword(Roles.Student,userId, data);

        setShowResetModal(false);
        if (!res.success) {
        toast.error('Cant update password');
        return res.success;
        }

        toast.success('Password Change successfully');
        return res.success;
    };


    //delete school
    const handleDeleteStudent = async () => {
        // const deleteSchool = await Swal.fire({
        // title: 'Are you sure?',
        // text: 'This action cannot be undone!',
        // icon: 'warning',
        // showCancelButton: true,
        // confirmButtonText: 'Yes, delete it',
        // });

        // if (!deleteSchool.isConfirmed) {
        // return;
        // }
        // const id = school.meta._id;

        // const res = await SchoolService.deleteSchool(id);

        // if (!res.success) {
        // toast.error(res.error.message);
        // return res.success;
        // }
        // localStorage.clear();
        // navigate('/login');
        // return res.success;
        return true;
    };

    return (
        <div className="p-6 bg-white min-h-screen max-w-6xl space-y-6">
        {/* ================= SCHOOL PROFILE ================= */}

        <Card title="Student Profile">
            <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="relative">
                <img
                src={image.preview !== '/school/profile_image.jpg' ?  image?.preview:user?.profile?user?.profile:'/school/profile_image.jpg' }
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
                <p className="text-gray-800 font-medium text-lg">{user?.name}</p>

                <p className="text-sm text-gray-500">{user?.email}</p>

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
            role={Roles.Student} 
            loading={loading} 
            utils={utils} setUtils={setUtils}  
        />

        {/* ================= DOCUMENTS ================= */}
        <ProfileDocumentsComponent 
            role={Roles.Student} 
            loading={loading} 
            utils={utils} setUtils={setUtils}  
        />

        {/* ================= DELETE SCHOOL =================
        <div className="flex justify-end">
            <button
            onClick={handleDeleteSchool}
            className="ml-5 mt-3 inline-flex border px-5 py-2 hover:bg-red-950 hover:text-white items-center gap-2 text-red-700 text-sm font-medium hover:underline"
            >
            <Trash size={16} />
            Delete 
            </button>
        </div> */}

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

export default StudentSettingsPage;