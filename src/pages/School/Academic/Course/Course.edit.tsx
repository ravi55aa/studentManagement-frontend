import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/useStoreHooks';
import { handleValidationOF } from '@/validation/validateFormData';
import { courseValSchema, courseFormSchema } from '@/validation/school.validator';
import { _useFormatDateForInput } from '@/hooks/useDateFormata';
//import {  IBatches } from "@/interfaces/ISchool";
import { initialForm, ICourseForm } from '@/interfaces/ICourseForm';
import { classes_Obj } from '@/constants/classes.constant';
import { InputField, Select } from '@/components';
import { Textarea } from '@/components/textArea';
import { CourseService } from '@/api/Services/course.service';
import { IGetAllCourse } from '@/types/tcourse';
import { Roles } from '@/constants/role.enum';

/* ===================== COMPONENT ===================== */

const CourseEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState<ICourseForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*UseEffect for fetch edit data's */
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await CourseService.get(Roles.Student,id);

      if (!res.success) {
        toast.warn(res.error.message);
        return res.success;
      }

      const courseToEdit = res?.data?.data;

      const { course, meta }: IGetAllCourse = courseToEdit;

      const initialForm: ICourseForm = {
        name: course?.name,
        code: course?.code,
        academicYear:
          typeof course?.academicYear == 'string' ? course?.academicYear : course?.academicYear,
        //level: course.level,
        description: course?.description,
        status: course?.status,

        duration: course?.duration,

        schedule: {
          startDate: _useFormatDateForInput(course?.schedule.startDate),
          endDate: _useFormatDateForInput(course?.schedule?.endDate),
        },

        maxStudents: Number(meta?.maxStudents),
        enrollmentOpen: true,

        subjects: meta?.subjects,
        classes: [...meta.classes],
        coordinators: meta?.coordinators,

        modelType: course?.modelType,
        center: course.modelType == 'School' ? 'School' : course?.center,

        eligibilityCriteria: '',
        syllabusUrl: '',
        attachments: [],
      };
      initialForm.academicYear = course?.academicYear.code;

      if (meta.subjects && meta?.subjects[0].subjectType == 'ACADEMIC') {
        initialForm.subjects = meta?.subjects[0]?.subjectRef;

        initialForm.subjects?.includes(undefined);
      } else {
        initialForm.subjects = meta?.subjects[0]?.customSubjectName;
      }
      //pending for the coordinators;

      setForm(initialForm);
    };
    fetchCourse();
  }, [id]);

  /****************** Redux-store ******************/
  //const batchesReduxStore=useAppSelector((state)=>state.batch);
  const subjectReduxStore = useAppSelector((state) => state.schoolSubject);
  const academicYearReduxStore = useAppSelector((state) => state.schoolYear);
  const centersReduxStore = useAppSelector((state) => state.center);

  /* ===================== HANDLERS ===================== */

  // generic change (supports nested fields)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const spanTag = document.getElementById(name.split('.').join(' '));

    if (spanTag) {
      spanTag.textContent = '';
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
      return;
    }

    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // file handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...Array.from(e.target.files!)],
    }));
  };

  const removeFile = (index: number) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSelfDevSubjectOfCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.subjects[1] = e.target.value;
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.center !== 'school') {
      setForm((prev) => ({ ...prev, modelType: 'Centers' }));
    }

    setForm((prev) => ({
      ...prev,
      maxStudents: prev.maxStudents,
      duration: { ...prev.duration, value: prev.duration.value },
    }));

    const isValidated = handleValidationOF<courseFormSchema>(courseValSchema, form);

    if (!isValidated.success) {
      console.log(isValidated.error);
      return isValidated.success;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // core
      formData.append('name', form.name);
      formData.append('code', form.code);

      formData.append('center', form.center);

      if (form.center !== 'School') {
        formData.append('modelType', 'Centers');
      } else {
        formData.append('modelType', 'School');
      }

      formData.append('academicYear', form.academicYear);
      //formData.append("level", form.level);
      formData.append('description', form.description);
      formData.append('status', form.status);

      // duration & schedule
      formData.append('duration[value]', String(form.duration.value));
      formData.append('duration[unit]', form.duration.unit);
      formData.append('schedule[startDate]', form.schedule.startDate);
      formData.append('schedule[endDate]', form.schedule.endDate);

      // capacity
      formData.append('maxStudents', String(form.maxStudents));
      formData.append('enrollmentOpen', String(form.enrollmentOpen));

      // relations

      form.subjects = subjectReduxStore.subjects.map((subject) => {
        if (form.subjects?.includes(subject._id)) {
          return subject.code;
        }
      });
      form.subjects?.forEach((id) => formData.append('subjects[]', id));
      form.classes?.forEach((id) => formData.append('classes[]', id));
      form.coordinators?.forEach((id) => formData.append('coordinators[]', id));

      // meta
      formData.append('eligibilityCriteria', form.eligibilityCriteria);
      formData.append('syllabusUrl', form.syllabusUrl);
      form.attachments.forEach((file) => formData.append('docs', file));

      const res = await CourseService.update(id, formData);
      if (!res.success) {
        toast.error(res.error.message);
        return res.success;
      }

      toast.success('Course edited successfully');
      navigate(-1);
    } catch (err) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchToggle = (value: string, key: string) => {
    console.log(form.subjects);

    if (key == 'subjects' && form.subjects?.includes('other')) {
      const i = form.subjects.indexOf('other');
      form.subjects.splice(i, 1);
    }

    setForm((prev) => {
      const exists = prev[key].includes(value);

      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((storedValue: string) => storedValue !== value)
          : [...prev[key], value],
      };
    });
  };

  /* ===================== UI ===================== */

  return (
    <div className="p-6 bg-white min-h-screen max-w-6xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Edit Course</h1>
      <p className="text-sm text-gray-500 mb-6">Update an academic course</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="border rounded-md p-6 space-y-6">
        {/* BASIC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Course Name *"
            name="name"
            value={form?.name}
            onChange={handleChange}
          />
          <InputField label="Code *" name="code" value={form?.code} onChange={handleChange} />
          {/* <Input label="Level" name="level" value={form?.level} onChange={handleChange} /> */}
        </div>

        {/* DURATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Duration Value *"
            name="duration.value"
            type="number"
            value={form?.duration.value}
            onChange={handleChange}
          />
          <Select
            label="Duration Unit *"
            name="duration.unit"
            value={form?.duration.unit}
            onChange={handleChange}
            options={[
              { label: 'Hours', value: 'hours' },
              { label: 'Months', value: 'months' },
              { label: 'Years', value: 'years' },
            ]}
          />
        </div>

        {/* Center */}
        <div>
          <label className="block text-sm font-medium mb-1">Center *</label>
          <select
            name="center"
            value={form?.center}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
          >
            <option value="">Select center</option>
            <option value="School">Main-School</option>
            {centersReduxStore.centers?.map((center) => {
              return <option value={center?._id}>{center?.name}</option>;
            })}
          </select>
          <span id="center" className="text-red-500 errorDisplay"></span>
        </div>

        {/* SCHEDULE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Start Date"
            name="schedule.startDate"
            type="date"
            value={form?.schedule.startDate}
            onChange={handleChange}
          />
          <InputField
            label="End Date"
            name="schedule.endDate"
            type="date"
            value={form?.schedule.endDate}
            onChange={handleChange}
          />
        </div>

        {/* MAXSTUDENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Max students"
            name="maxStudents"
            type="number"
            value={form?.maxStudents}
            onChange={handleChange}
          />
        </div>

        {/* SUB+BATCHES+COORDINATORS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Classes */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Choose Classes</label>

            <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
              {Object.keys(classes_Obj).map((batch) => (
                <label key={batch} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.classes?.includes(classes_Obj[batch])}
                    onChange={() => handleBatchToggle(classes_Obj[batch], 'classes')}
                    className="accent-green-700"
                  />

                  <span className="capitalize text-gray-800 ml-1">{batch}</span>
                </label>
              ))}
            </div>

            {form?.classes?.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No batches selected</p>
            )}
          </div>

          {/* Subjects */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Choose Subjects</label>

            <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
              {subjectReduxStore?.subjects.length <= 0 ? (
                <input readOnly type="text" placeholder="No Batch Data: could be fetch_err()" />
              ) : (
                subjectReduxStore?.subjects?.map((subject) => (
                  <label
                    key={subject?.code}
                    className="flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form?.subjects.includes(subject._id)}
                      onChange={() => handleBatchToggle(subject._id, 'subjects')}
                      className="accent-green-700"
                    />
                    <span>
                      {subject?.name}
                      <span className="text-gray-500 ml-1">({subject?.code})</span>
                    </span>
                  </label>
                ))
              )}

              <label htmlFor="other" className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  id="other"
                  checked={form.subjects[0] == 'other'}
                  onChange={() => setForm((prev) => ({ ...prev, subjects: ['other'] }))}
                  className="accent-green-700"
                />
                Other
              </label>

              {form.subjects[0] == 'other' && (
                <InputField
                  label="Enter the Subject"
                  name="otherCourse"
                  type="text"
                  value={form.subjects[1]}
                  onChange={handleSelfDevSubjectOfCourse}
                />
              )}
            </div>

            {form?.classes?.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No batches selected</p>
            )}
          </div>

          {/* Academic Year */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Choose AcademicYear</label>

            <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
              {academicYearReduxStore.years?.map((year) => (
                <label key={year?.code} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={form.academicYear == year?.code}
                    name="academicYear"
                    value={year?.code}
                    onChange={(e) => handleChange(e)}
                    className="accent-green-700"
                  />
                  <span>
                    {year?.code}
                    <span className="text-gray-500 ml-1">({year?.startDate.split('T')[0]})</span>
                  </span>
                </label>
              ))}
            </div>

            {form?.classes?.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No Academic year selected</p>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <Textarea
          label="Description"
          name="description"
          value={form?.description}
          onChange={handleChange}
        />

        {/* FILES */}
        <div>
          <label className="block text-sm font-medium mb-1">Attachments</label>
          <input type="file" multiple onChange={handleFileChange} />
          <ul className="mt-2 space-y-1">
            {form?.attachments.map((file, i) => (
              <li key={i} className="flex justify-between text-sm">
                {file?.name}
                <button type="button" onClick={() => removeFile(i)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white px-6 py-2 rounded"
          >
            {loading ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditPage;
