import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { InputField } from '@/components';
import { Lock, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IResetPassword } from '@/interfaces/ISchool';
import { handleApi, HandleApiOptions } from '@/api/global.api';
import { IDocument, IUploadedDoc } from '@/interfaces/IRegister';
import { handleValidationOF } from '@/validation/validateFormData';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';

import { addressValidate, passwordSchema } from '@/validation/school.validator';

import DocumentUploadModal from '@/components/Document/Document.upload.modal';

import { school_Register_SchemaFor_Address } from '@/constants/createSchool';

import {
  ISubjectReducer,
  setSchool_MDA_Data,
  toggleMDALoading,
} from '@/utils/Redux/Reducer/school.reducer';

import { DocumentRoute, SchoolRoute } from '@/constants/routes.contants';
import { SchoolService } from '@/api/Services/school.service';
import { AddressService } from '@/api/Services/address.service';
import { DocumentService } from '@/api/Services/document.service';
import { Card, Info, PasswordResetModal, ViewFileModal } from '@/components/School/card';
import DocumentRow from '@/components/Document/Documents.row';
import { useAppNavigate } from '@/hooks/useNavigate.hook';

/* ------------------------------------------------ */
interface IAddress {
  city: string;
  street: string;
  state: string;
  zip: string;
  country: string;
}

const SchoolSettingsPage = () => {
  /**
   * USE-STATE
   */
  const [showOtp, setShowOtp] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const school=useAppSelector((state)=>state.schoolMDA);

  const [utils, setUtils] = useState({
    error: '',
    loading: false,
    isOpen: false,
    isOpenDocument: false,
    isOpenUploadDocument: false,
  });

  //address
  const [form, setForm] = useState<IAddress>({
    city: '',
    street: '',
    state: '',
    zip: '',
    country: '',
  });

  const [documentState, setDocuments] = useState<Partial<IDocument>>({
    docs: [],
    role: 'School',
  });

  const [selectedFile, setSelectedFile] = useState<IUploadedDoc | null>(null);

  const [openView, setOpenView] = useState(false);
  const navigate=useAppNavigate();

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

      //update the meta,documents,address STATES
      /**
       * DOCUMENT
       */
      setDocuments({
        docs: documents?.docs || [],
        role: documents?.role,
      });

      /**
       * Address
       */
      setForm({
        street: address.street,
        state: address.state,
        city: address.city,
        zip: address.zip,
        country: address.country,
      });

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
    dispatch(toggleMDALoading());
    const id = address.userId;
    const formData = new FormData();
    formData.append('profile', image.file);

    const res = await SchoolService.updateMeta(id, formData);
    dispatch(toggleMDALoading());

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    document.getElementById(e.target.name)!.textContent = '';

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  /**
   * Address
   */
  const handleSubmitEditAddress = async () => {
    const id = address.userId;
    //validation
    const isValid = handleValidationOF(addressValidate, form);

    if (!isValid.success) {
      return isValid.success;
    }

    dispatch(toggleMDALoading());

    const res = await AddressService.update(id, form);

    dispatch(toggleMDALoading());
    if (!res.success) {
      return res.success;
    }

    toast.success('Edited the address successfully');
    setUtils((prev) => ({ ...prev, isOpen: false }));
    //need to refreshThePage
    return res.success;
  };

  /**
   * Document
   */
  const handleSubmitEditDocument = async () => {
    const id = address.userId;

    dispatch(toggleMDALoading());
    const config: HandleApiOptions<IAddress> = {
      method: 'put',
      endPoint: `${DocumentRoute.edit}/${id}`,
      payload: form,
      headers: { role: 'School' },
    };
    const res = await handleApi<IAddress, null>(config);

    if (!res.success) {
      toast.error(res.error.message);
      return res.success;
    }

    toast.success(res.data.message);
    setUtils((prev) => ({ ...prev, isOpen: false }));
    //need to refreshThePage
    return res.success;
  };

  const removeAFile = async (index: number): Promise<boolean> => {
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
    dispatch(toggleMDALoading());

    //Reload the data again
    const userId: string = address.userId;

    const delete_fileName = documents.docs[index].fileName;

    const res = await DocumentService.delete(userId, delete_fileName);

    dispatch(toggleMDALoading());
    if (!res.success) {
      toast.error(`Error 500: ${res.data.error}`);
      return res.success;
    }

    toast.success('File Removed successfully 200');
    return res.success;
  };

  const handleView = (index: number) => {
    const subDocument = documentState.docs[index];

    if (!subDocument) {
      toast.error('Throwing error 409 : Check Later');
      return;
    }
    setSelectedFile(subDocument);
    setOpenView(true);
  };

  const handleSaveFile = async (file: File) => {
    // This save is to
    // edit individual document

    console.log('New file:', file);

    // API call here
    // await uploadNewFile(file);

    setOpenView(false);
  };

  const handleUploadDocuments = async (files: File[]) => {
    try {
      const formData = new FormData();
      const userId = address.userId;
      //validation of size and same file upload

      files.forEach((file) => {
        formData.append('docs', file);
      });

      dispatch(toggleMDALoading());

      const res = await DocumentService.create(userId, formData);

      dispatch(toggleMDALoading());
      if (!res.success) {
        toast.error(`Error 500: ${res.data.error}`);
        return res.success;
      }

      toast.success('Documents uploaded successfully');

      setUtils((prev) => ({ ...prev, isOpenUploadDocument: false }));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Document upload failed');
    }
  };

  const handleCloseDocumentsModal = () => {
    setUtils((prev) => ({ ...prev, isOpenUploadDocument: false }));
  };

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
    const id=school.meta._id;

    const res = await SchoolService.deleteSchool(id);

    if (!res.success) {
      toast.error(res.error.message);
      return res.success;
    }
    localStorage.clear();
    navigate("/login");
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

      <Card title="Address">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <Info label="Street" value={address?.street} />
          <Info label="City" value={address?.city} />
          <Info label="State" value={address?.state} />
          <Info label="Zip" value={address?.zip} />
          <Info label="Country" value={address?.country} />
        </div>

        <button
          onClick={() => setUtils((prev) => ({ ...prev, isOpen: true }))}
          className="mt-4 text-green-700 text-sm font-medium hover:underline"
        >
          {loading ? 'Editing' : 'Edit Address'}
        </button>
      </Card>

      {/* MODAL */}
      {utils.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {school_Register_SchemaFor_Address.map((ele, i) => (
                <InputField
                  key={i}
                  value={form?.[ele.name]}
                  label={ele.name}
                  placeholder={ele.placeholder}
                  type={ele.placeholder}
                  name={ele.name}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setUtils((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitEditAddress}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {utils.isOpenUploadDocument && (
        <DocumentUploadModal
          open={utils.isOpenUploadDocument}
          onClose={handleCloseDocumentsModal}
          onUpload={handleUploadDocuments}
        />
      )}

      {/* ================= DOCUMENTS ================= */}

      <Card title="Documents">
        <div className="space-y-3">
          {/* Uploaded Files List */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="text-gray-700 font-semibold mb-1">Uploaded Files</h3>

            <button
              onClick={() => setUtils((prev) => ({ ...prev, isOpenUploadDocument: true }))}
              type="button"
              className="mb-1 text-green-500 text-sm underline"
            >
              Upload
            </button>

            <div className="overflow-y-auto max-h-60">
              {!loading && documentState.docs?.length > 0 ? (
                documentState.docs.map((file: IUploadedDoc, index: number) => (
                  <DocumentRow
                    file={file}
                    removeAFile={removeAFile}
                    editFile={handleView}
                    key={index}
                    index={index}
                  />
                ))
              ) : (
                <p className="text-gray-500 font-semibold text-sm mb-3">
                  No Documents are available
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={handleDeleteSchool}
          className="ml-5 mt-3 inline-flex border px-5 py-2 hover:bg-red-950 hover:text-white items-center gap-2 text-red-700 text-sm font-medium hover:underline"
        >
          <Trash size={16} />
          Delete School
        </button>
      </div>

      {/* MODAL-DOCUMENT */}
      {utils.isOpenDocument && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Document</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {school_Register_SchemaFor_Address.map((ele, i) => (
                <InputField
                  key={i}
                  value={form?.[ele.name]}
                  label={ele.name}
                  placeholder={ele.placeholder}
                  type={ele.placeholder}
                  name={ele.name}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setUtils((prev) => ({ ...prev, isOpenDocument: false }))}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitEditDocument}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openView && (
        <ViewFileModal
          open={openView}
          file={selectedFile}
          onClose={() => setOpenView(false)}
          onSave={handleSaveFile}
        />
      )}

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
