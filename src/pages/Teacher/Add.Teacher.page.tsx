import React, { useState } from "react";
import InputField from "@/components/inputField";
import { Select } from "@/components/Select";
import { toast } from "react-toastify";

import { EDepartment, Gender_types } from "@/types/enums";
import { ITeacher,ITeacherBio } from "@/interfaces/ITeacher";
import { handleApi, HandleApiOptions } from "@/api/global.api";

import { useAppSelector } from "@/hooks/storeHooks";
import { department_obj } from "@/constants/deparment";
import { useAppNavigate } from "@/hooks/navigate.hook";
import { handleValidationOF } from "@/validation/validateFormData";
import DocumentUploadModal from "@/components/Document/Document.upload.modal";

import { employmentStatusOptions, teacherDesignationOptions } from "@/constants/teacher";
import { teacherAssignmentSchema, teacherBioFormSchema } from "@/validation/teacher.validation";


import { 
  CheckBox,
  RadioGroup,CheckList } from "@/components/Teacher";
import { basicTeacherFields } from "@/constants/teacher.Fields";
import { ActionBar, FileUpload,Grid } from "@/components/Teacher/ActionBar";
import { Section } from "@/components/Teacher/Section";
/* ------------------------------------------------ */


const AddTeacherPage = () => {
    const [teacherId, setTeacherId] = useState<string | null>("");
    const [utils,setUtils]=useState(
            {   error:"",
                loading:false,
                isOpen:false,
                isOpenDocument:false,
                isOpenUploadDocument:false
            }
        );

  /* ---------- STEP 1 ---------- */
    const [basicForm, setBasicForm] = useState<Partial<ITeacherBio>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        qualification: "",
        dateOfBirth: null,
        experience: 0,
        gender: Gender_types.Male,
        profilePhoto: null as File | null,
        documents: [] as (string|File)[] ,
    });


    /* ---------- STEP 2 ---------- */
    const [professionalForm, setProfessionalForm] = useState<Partial<ITeacher>>({
        classTeacherOf: null,
        employmentStatus: null,
        assignedSubjects: [] as string[],
        designation: null,
        academicYearId:null,
        department: [] as EDepartment[],
        dateOfJoining: null,
        dateOfLeaving: null,
        centerId: null,
    });


    
    const {goBack}=useAppNavigate();

    /*-----------REDUX STATES-------*/
    const batchStore=useAppSelector((state)=>state.batch);
    const subjectStore=useAppSelector((state)=>state.schoolSubject);
    const centersReduxStore=useAppSelector((state)=>state.center);
    const yearStore=useAppSelector((state)=>state.schoolYear);




  /* ---------- handlers ---------- */
    const handleBasicChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const spanTag=document.getElementById(name);

        if(spanTag){
          spanTag.textContent="";
        }

        if (name in basicForm) {
        setBasicForm((p) => ({ ...p, [name]: value }));
      }

      if (name in professionalForm) {
        setProfessionalForm((p) => ({ ...p, [name]: value }));
      }

    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: "profilePhoto" | "documents"
    ) => {
        if (!e.target.files) return;

        if (key === "profilePhoto") {
        setBasicForm((p) => ({
            ...p,
            profilePhoto: e.target.files![0],
        }));
        } else {

        setBasicForm(
          (p) => (
            {...p, documents: [...p.documents, ...Array.from(e.target.files!)]
        }));

        }
    };


    const handleDepartmentToggle = (e:React.ChangeEvent<HTMLInputElement> ) => {
      const {name}=e.target;

      const dept=department_obj[name]

      setProfessionalForm((prev) => {
          const exists = prev.department.includes(dept);

          return {
          ...prev,
          department: exists
              ? prev.department.filter((id) => id !== dept)
              : [...prev.department, dept],
          };
      });
    };

    
    const handleCreateTeacherBio = async():Promise<boolean> => {
      const isValid=handleValidationOF(teacherBioFormSchema,basicForm);
      
      setBasicForm((prev)=>({...prev, experience:Number(prev.experience)}));

      if(!isValid.success){
        return isValid.success;
      }

      const formData = new FormData();

    // text fields      
      const fieldsToAvoid=["firstName","lastName","email","phone","gender","qualification"];  

      for(const field of fieldsToAvoid){
        formData.append(field, basicForm[field]);
      }

      // dates → always send as string
      if (basicForm.dateOfBirth) {
        formData.append("dateOfBirth", new Date(basicForm.dateOfBirth).toISOString());
      }


      // numbers → convert to string
      formData.append("experience", String(basicForm.experience));

      // single file
      if (basicForm.profilePhoto) {
        formData.append("profile", basicForm.profilePhoto);
      }

      // multiple files / mixed array
      basicForm.documents?.forEach((doc) => {
      if (doc) {
        // new upload
        formData.append("docs", doc);
      } else if (typeof doc === "string") {
        // existing document (url / filename)
        formData.append("docs", doc);
      }
    });


        const config:HandleApiOptions<FormData>={
          endPoint:"/teacher/bio/create",
          method:"post",
          payload:formData,
          headers:{role:"School"}
        };

        const res =
        await handleApi<FormData,Partial<ITeacherBio>>(config);

        if(!res.success){
          toast.error("Cannot Create the teacher Err:500");
          console.log("@AddTeacher.page res",res);
          return false;
        }
        const teacher=res?.data.data;


        //Store the teacher._id at LS=localStorage
        //later delete the ._id form the LS;
        //after adding teacher_professionalism data.
        localStorage.setItem("teacherId",JSON.stringify(teacher._id));
        setTeacherId(teacher._id);
        toast.success("Updated..")
        return res.success;
    };


    const handleCreateTeacher= async() => {

        const teacherId=JSON.parse(localStorage.getItem("teacherId"));
        
        const isValid=handleValidationOF(
          teacherAssignmentSchema,professionalForm);

        if(!isValid.success){
          return isValid.success;
        }

        const config:HandleApiOptions<Partial<ITeacher>>={
          endPoint:`/teacher/create/${teacherId}`,
          method:"post",
          payload:professionalForm,
          headers:{role:"School"}
        };

        const res =
        await handleApi<Partial<ITeacher>,Partial<ITeacher>>(config);

        if(!res.success){
          toast.error("Error, updating professional data  Err:500");
          console.log("@AddTeacher.page res",res);
          return false;
        }

        toast.success("Teacher Created successfully");
        
        //Remove stored local-storage data
        localStorage.removeItem("teacherId");
        setTeacherId("teacherId");
        goBack();
        return res.success;
    };


    const handleCloseDocumentsModal = () => {
        setUtils((prev)=>({...prev,isOpenUploadDocument:false}));
    };


    const handleUploadDocuments = (files: File[]) => {
        setBasicForm((prev)=>({...prev,documents:files}));
        setUtils((prev)=>({...prev,isOpenUploadDocument:false}));
        return true;
      };


  return (
    <div className="p-6 bg-white min-h-screen max-w-6xl space-y-8">

      <Section title="Basic Teacher Information">
        <Grid>
          {basicTeacherFields.map((field,ind)=>{
            return (<InputField key={ind} label={field.label} type={field.type}  name={field.name} onChange={handleBasicChange} />) 
          })}
        </Grid>

        {/* Gender */}
        <RadioGroup
          label="Gender"
          name="gender"
          options={["male", "female", "other"]}
          onChange={handleBasicChange}
        />

        <hr />
        <FileUpload
          label="Profile Photo"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, "profilePhoto")}
        />
        

        {/* Documents */}
        <DocumentUploadModal 
            open={utils.isOpenUploadDocument}  
            onClose={handleCloseDocumentsModal}
            onUpload={handleUploadDocuments} 
            />
        
        <div className="flex gap-2 mb-0">
          <p className="text-sm font-medium mb-1">Documents</p>
          <button 
                      onClick={()=>setUtils((prev)=>({...prev,isOpenUploadDocument:true}))}
                      type="button"
                      className="mb-1 text-green-500 text-sm underline"> 
                      Upload
            </button>
        </div>

        <div className="max-h-50 overflow-y-auto">  

          {basicForm.documents.length > 0 && 
          <ul className="underline underline-offset-3 mb-2 ">Uploaded Documents
            {basicForm.documents.map((file,index)=>{
            return(  
            <li className="bg-gray-300 mb-1" key={index+file.name}>{file.name + " "} 
            <span className="text-blue-700 ">- {file.size} KB</span></li>
            )}
            )}
          </ul>   
          }
        </div>


        <ActionBar>
          <button
            onClick={handleCreateTeacherBio}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
          >
            Create Teacher
          </button>
        </ActionBar>
      </Section>

      {/* ================= STEP 2 ================= */}
      {teacherId && (
        <Section title="Professional Details">
          <Grid>
            <Select
              label="Employment Status"
              name="employmentStatus"
              options={employmentStatusOptions}
              onChange={handleBasicChange}
            />

            <Select
              label="Designation"
              options={teacherDesignationOptions}
              name="designation"
              onChange={handleBasicChange}
            />

            <InputField type="date" name="dateOfJoining" onChange={handleBasicChange} label="Date of Joining" />
            <InputField type="date" name="dateOfLeaving" onChange={handleBasicChange} label="Date of Leaving" />
          </Grid>

           {/* Center */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Center *
                </label>
                <select
                name="centerId"
                value={professionalForm.centerId}
                onChange={handleBasicChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                >
                <option value="">Select center</option>
                {centersReduxStore.centers?.map((batch)=>{
                    return   (
                    <option value={batch?._id}>{batch?.name}</option>
                  )

                })}
                </select>
                <span id="centerId" className="text-red-500 errorDisplay"></span>
            </div>


          {/* Batches */}
          <CheckList
            label="Class Teacher Of"
            items={batchStore.batches}
            type="radio"
            name="classTeacherOf"
            selected={professionalForm.classTeacherOf}
            displayKey="name"
            onChange={(code) =>
              setProfessionalForm((prev) => ({
                ...prev,
                classTeacherOf: code,
              }))
            }
          />



          {/* ACADEMIC YEAR  */}
          <CheckList
          label="Select Academic Year"
          items={yearStore.years}
          type="radio"
          name="academicYear"
          selected={professionalForm.academicYearId}
          displayKey="year"
          onChange={(code) =>
            setProfessionalForm((prev) => ({
              ...prev,
              academicYearId: code,
            }))
          }
        />


          {/* Subjects */}
          <CheckList
            label="Assigned Subjects"
            items={subjectStore.subjects}
            type="checkbox"
            selected={professionalForm.assignedSubjects}
            displayKey="name"
            onChange={(code) =>
              setProfessionalForm((prev) => {
                const exists = prev.assignedSubjects.includes(code);

                return {
                  ...prev,
                  assignedSubjects: exists
                    ? prev.assignedSubjects.filter((id) => id !== code)
                    : [...prev.assignedSubjects, code],
                };
              })
            }
          />


          {/* Department */}
          <CheckBox
            label="Department"
            items={department_obj}
            name="department"
            onChange={handleDepartmentToggle}
          />

          <ActionBar>
            <button 
            type="button"
            onClick={handleCreateTeacher}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800">
              Save & Finish
            </button>
          </ActionBar>
        </Section>
      )}
    </div>
  );
};

export default AddTeacherPage;


