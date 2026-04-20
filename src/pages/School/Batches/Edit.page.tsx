import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useStoreHooks';
import { handleValidationOF } from '@/validation/validateFormData';
import { batchSchema } from '@/validation/school.validator';
import { useParams } from 'react-router-dom';
import { useAppNavigate } from '@/hooks/useNavigate.hook';
import { _useFormatDateForInput } from '@/hooks/useDateFormata';
import { InputField } from '@/components';
import { toast } from 'react-toastify';
import { ITeacherBio } from '@/interfaces/ITeacher';
import FormActions from '@/components/FormAction';
import { TeacherService } from '@/api/Services/teacher.service';
import { BatchService } from '@/api/Services/batch.service';
import { Roles } from '@/constants/role.enum';
import { paginationQuery } from '@/constants/pagination';

const EditBatch = () => {
  const [form, setForm] = useState({
    name: '',
    code: '',
    center: '',
    counselor: '',
    startDate: '',
    endDate: '',
    modelType: 'School',
    isActive: true,
  });

  const [unAssignedTeachers, setUnAssignedTeachers] = useState<ITeacherBio[] | []>([]);

  const { id } = useParams();
  const { goBack } = useAppNavigate();

  useEffect(() => {
    const fetchBatchById = async () => {
      const res = await BatchService.getById(id);

      const batchData = res?.data?.data;

      setForm({
        name: batchData?.name || '',
        modelType: batchData?.modelType || 'School',
        code: batchData?.code || '',
        center: batchData?.center || '',
        counselor: batchData.batchCounselor,
        startDate: _useFormatDateForInput(batchData?.schedule.startTime) || '',
        endDate: _useFormatDateForInput(batchData?.schedule.endTime) || '',
        isActive: batchData?.status == 'active' ? true : false,
      });
    };
    fetchBatchById();
  }, [id]);

  useEffect(() => {
    (async () => {
      const span = document.getElementById('counselor');

      if (!form.center) {
        if (span) {
          span.textContent = "Before counselor, select a 'CENTER'";
        }
        return true;
      }
      span.textContent = '';

      const res = await TeacherService.getAllUnAssigned(form.center,paginationQuery);
      const resData = res?.data?.data;
      const teachers = resData.data || [];

      if (!teachers || teachers.length <= 0) {
        span.textContent = 'Not found unassigned TEACHERS, from chosen CENTER';
      }

      setUnAssignedTeachers(teachers);
      return true;
    })();
  }, [form.center]);

  const [error, setError] = useState<string | null>(null);
  //const batchReduxStore=useAppSelector((state)=>state.batch);
  const centerReduxStore = useAppSelector((state) => state.center);

  /* ---------- Handle Change ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const spanTag = document.getElementById(name);

    if (spanTag) {
      spanTag.textContent = '';
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.center !== 'School') {
      setForm((prev) => ({ ...prev, modelType: 'Centers' }));
    }

    const isValid = handleValidationOF(batchSchema, form);
    if (!isValid.success) {
      console.log('error', isValid.error);
      return isValid.success;
    }

    const res = await BatchService.update(id, form);

    if (!res.success) {
      toast.error(res.error.message);
      return res.success;
    }

    toast.success(res.data.message);
    setError(null);
    goBack();
    return true;
  };

  return (
    <div className="p-6 bg-[#fbf3f1] min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Edit Batch</h1>
      <p className="text-sm text-gray-500 mb-6">Edit a batch under a center</p>

      {/* Error */}
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border rounded-md p-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batch Name */}
          <InputField
            type="string"
            name="name"
            onChange={handleChange}
            label="Batch Name *"
            placeholder="e.g. 6 A"
            value={form.name}
          />

          {/* Batch Code */}
          <InputField
            type="string"
            name="code"
            onChange={handleChange}
            label="Batch Code *"
            placeholder="e.g. CODE12"
            value={form.code}
          />

          {/* Center */}
          <div>
            <label className="block text-sm font-medium mb-1">Center *</label>
            <select
              name="center"
              value={form.center}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
            >
              <option value="">Select center</option>
              <option value="School">Main-School</option>
              {centerReduxStore.centers?.map((batch) => {
                return <option value={batch?._id}>{batch?.name}</option>;
              })}
            </select>
            <span id="center" className="errorDisplay text-sm text-red-500">
              {' '}
            </span>
          </div>

          {/* Batch Counselor */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Batch Counselor - (List of all available teachers from chosen 'center')
            </label>
            <select
              name="counselor"
              value={form.counselor}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
            >
              <option value="">Select counselor</option>
              {unAssignedTeachers?.map((counselor: ITeacherBio) => {
                return (
                  <option value={counselor?._id}>
                    {counselor?.firstName} {counselor?.lastName}
                  </option>
                );
              })}
            </select>
            <span id="counselor" className="text-red-500 errorDisplay"></span>
          </div>

          {/* Start Date */}
          <InputField
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            label="Start Date *"
            placeholder="e.g. 6 A"
          />

          {/* End Date */}
          <InputField
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            label="End Date *"
            placeholder="e.g. 6 A"
          />

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="accent-green-700"
            />
            <span className="text-sm">Is Active</span>
          </div>
        </div>

        {/* Actions */}
        <FormActions submitLabel="Save Batch" onCancel={goBack} submitType="submit" />
      </form>
    </div>
  );
};

export default EditBatch;
