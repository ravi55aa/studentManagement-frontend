import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Camera,
    Lock,
    Mail,
    User2,
    Upload,
    Trash2 } from 'lucide-react';
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
        
        const res = await StudentService.getById(user.id);
        
        const resAddress = await AddressService.getAAddress(user.id);
        const resDocument = await DocumentService.getById(user.id);
        
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

        const res = await StudentService.update(id, formData);
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
        <div className="p-6 bg-white min-h-screen max-w-auto space-y-6">
        {/* ================= SCHOOL PROFILE ================= */}

        <Card title="Student Profile">

        <div className="flex flex-col xl:flex-row gap-10 xl:items-center">

            {/* ---------- Profile Image ---------- */}
            <div className="relative flex flex-col items-center">

            {/* Outer Glow */}
            <div className="relative">

                {/* Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 blur-md opacity-20 scale-110" />

                {/* Image */}
                <div className="relative h-36 w-36 rounded-full border-[5px] border-white shadow-xl overflow-hidden">

                <img
                    src={
                    image.preview !== "/school/profile_image.jpg"
                        ? image?.preview
                        : user?.profile
                        ? user?.profile
                        : "/school/profile_image.jpg"
                    }
                    className="h-full w-full object-cover"
                />
                </div>

                {/* Camera Icon */}
                <div className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white shadow-md">
                <Camera className="w-5 h-5 text-emerald-700" />
                </div>
            </div>

            {/* Upload Button */}
            <label
                className="
                mt-5
                flex cursor-pointer items-center gap-2
                rounded-2xl border border-emerald-100
                bg-emerald-50 px-5 py-3
                text-sm font-semibold text-emerald-700
                transition-all duration-300
                hover:bg-emerald-100
                "
            >
                <Upload className="w-4 h-4" />

                Change Photo

                <input
                type="file"
                hidden
                onChange={(e) => handleImageChange(e)}
                />
            </label>

            {/* Action Buttons */}
            {image.preview !== "/school/profile_image.jpg" && (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

                {/* Update */}
                <button
                    onClick={handleUpdateProfile}
                    className="
                    rounded-2xl
                    bg-gradient-to-r from-emerald-600 to-green-600
                    px-5 py-3
                    text-sm font-semibold text-white
                    shadow-md
                    transition-all duration-300
                    hover:scale-[1.03]
                    hover:shadow-lg
                    "
                >
                    {loading ? "Updating..." : "Update"}
                </button>

                {/* Remove */}
                <button
                    onClick={() =>
                    setImage({
                        preview: "/school/profile_image.jpg",
                        file: null,
                    })
                    }
                    className="
                    flex items-center gap-2
                    rounded-2xl border border-red-100
                    bg-red-50 px-5 py-3
                    text-sm font-semibold text-red-600
                    transition-all duration-300
                    hover:bg-red-100
                    "
                >
                    <Trash2 className="w-4 h-4" />

                    Remove
                </button>
                </div>
            )}
            </div>

            {/* ---------- User Info ---------- */}
            <div className="flex-1">

            {/* Welcome */}
            <div className="mb-8">

                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-100">
                Student Portal
                </div>

                <h1 className="mt-4 text-3xl font-bold text-slate-800">
                {user?.name}
                </h1>

                <p className="mt-2 text-slate-500">
                Manage your academic profile and account settings
                </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Name */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <User2 className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                    <p className="text-sm text-slate-500">
                        Full Name
                    </p>

                    <h3 className="font-semibold text-slate-800">
                        {user?.name}
                    </h3>
                    </div>
                </div>
                </div>

                {/* Email */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <Mail className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                    <p className="text-sm text-slate-500">
                        Email Address
                    </p>

                    <h3 className="font-semibold text-slate-800 break-all">
                        {user?.email}
                    </h3>
                    </div>
                </div>
                </div>
            </div>

            {/* Password */}
            <button
                onClick={() => setShowResetModal(true)}
                className="
                mt-8
                inline-flex items-center gap-3
                rounded-2xl
                border border-emerald-100
                bg-gradient-to-r from-emerald-50 to-green-50
                px-5 py-4
                text-sm font-semibold text-emerald-700
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-md
                "
            >
                <Lock size={18} />

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