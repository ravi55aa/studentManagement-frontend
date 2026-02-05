import React, { ReactNode, useState } from "react";
import InputField from "@/components/inputField";
import { Select } from "@/components/Select";
import { toast } from "react-toastify";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { EDepartment, Gender_types } from "@/types/enums";
import { ITeacher,ITeacherBio } from "@/interfaces/ITeacher";
import { useAppNavigate } from "@/hooks/navigate.hook";
import DocumentUploadModal from "@/components/Document/Document.upload.modal";
import { handleValidationOF } from "@/validation/validateFormData";
import { teacherAssignmentSchema, teacherBioFormSchema } from "@/validation/teacher.validation";
import { useAppSelector } from "@/hooks/storeHooks";
/* ------------------------------------------------ */




const AddTeacherPage = () => {
    const [teacherId, setTeacherId] = useState<string | null>(null);
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
        classTeacherOf: [] as string[],
        employmentStatus: null,
        assignedSubjects: [] as string[],
        designation: null,
        department: [] as EDepartment[],
        dateOfJoining: null,
        dateOfLeaving: null,
    });
    
    const {goBack}=useAppNavigate();

    /*-----------REDUX STATES-------*/
    const batchStore=useAppSelector((state)=>state.batch);
    const subjectStore=useAppSelector((state)=>state.schoolSubject);
    const yearStore=useAppSelector((state)=>state.schoolYear);
    console.log(yearStore.years);



  /* ---------- handlers ---------- */
    const handleBasicChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const spanTag=document.getElementById(name);

        if(spanTag){
          spanTag.textContent="";
        }

        setProfessionalForm((p)=> ({ ...p, [name]: value }));
        setBasicForm((p) => ({ ...p, [name]: value }));
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


    
    const handleCreateTeacherBio = async():Promise<boolean> => {
      const isValid=handleValidationOF(teacherBioFormSchema,basicForm);
      
      setBasicForm((prev)=>({...prev, experience:Number(prev.experience)}));

      if(!isValid.success){
        return isValid.success;
      }

        const config:HandleApiOptions<Partial<ITeacherBio>>={
          endPoint:"/teacher/bio/create",
          method:"post",
          payload:basicForm,
          headers:{role:"School"}
        };

        const res =
        await 
        handleApi<Partial<ITeacherBio>,Partial<ITeacherBio>>(config);

        if(!res.success){
          toast.error("Cannot Create the teacher Err:500");
          console.log("@AddTeacher.page res",res);
          return false;
        }
        const teacher=res.data.data;

        //Store the teacher._id at LS=localStorage
        //later delete the ._id form the LS;
        //after adding teacher_professionalism data.
        localStorage.setItem("teacherId",JSON.stringify(teacher._id));
        setTeacherId(teacher._id);
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
          <InputField label="First Name" type="text"  name="firstName" onChange={handleBasicChange} />
          <InputField label="Last Name" type="text" name="lastName" onChange={handleBasicChange} />
          <InputField label="Email" name="email" type="email" onChange={handleBasicChange} />
          <InputField label="Phone" type="tel" name="phone" onChange={handleBasicChange} />
          <InputField label="Qualification" type="text" name="qualification" onChange={handleBasicChange} />
          <InputField label="Date of Birth" type="date" name="dateOfBirth" onChange={handleBasicChange} />
          <InputField label="Experience (years)" type="number" name="experience" onChange={handleBasicChange} />
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
      {true && (
        <Section title="Professional Details">
          <Grid>
            <Select
              label="Employment Status"
              name="employmentStatus"
              options={[
                "active",
                "inactive",
                "on_leave",
                "resigned",
                "terminated",
              ]}
              onChange={handleBasicChange}
            />

            <Select
              label="Designation"
              options={[
                "teacher",
                "assistant_teacher",
                "head_of_department",
                "head_master",
              ]}
              name="designation"
              onChange={handleBasicChange}
            />

            <InputField type="date" name="dateOfJoining" onChange={handleBasicChange} label="Date of Joining" />
            <InputField type="date" name="dateOfLeaving" onChange={handleBasicChange} label="Date of Leaving" />
          </Grid>

          {/* Batches */}
          <CheckboxList
            label="Class Teacher Of"
            items={batchStore.batches}
            name="classTeacherOf"
            onChange={(e)=>handleBasicChange(e)}
          />

          {/* Subjects */}
          <CheckboxList
            label="Assigned Subjects"
            items={subjectStore?.subjects}
            name="assignedSubjects"
            onChange={(e)=>handleBasicChange(e)}
          />

          {/* Department */}
          <CheckboxList
            label="Department"
            items={[
              "mathematics",
              "science",
              "english",
              "computer_science",
            ]}
            name="department"
            onChange={(e)=>handleBasicChange(e)}
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


function Section({ title, children }: {title:string,children:ReactNode}) {
    return (
    
        <div className="border rounded-lg p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </div>
    );
}

interface GridProps {
  children: ReactNode;
}

const Grid = ({ children }: GridProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);


function RadioGroup(
  { label, options, name, onChange }: 
  {label:string,options:unknown[],
    name:string,onChange:(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    )=>void}
  ) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="flex gap-6">
        {options.map((o: string) => (
          <label key={o} className="flex gap-2 text-sm">
            <input type="radio" name={name} value={o} onChange={onChange} />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}


function CheckboxList({ label, items,name,onChange }: {label:string,items:unknown[],name:string,onChange:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>void
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((i: string) => (
          <label key={i} className="flex gap-2 text-sm">
            <input onChange={onChange} type="checkbox" />
            {i}
          </label>
        ))}
        
      </div>
      <span id={name} onChange={onChange} className="text-red-500 text-sm errorDisplay"></span>
    </div>
  );
}


function FileUpload({ label, ...props }) {
    return (
        <div>
        <p className="text-sm font-medium mb-1">{label}</p>
        <input type="file" {...props} />
        </div>
    );
}


const ActionBar = ({ children }:GridProps) => (
    <div className="flex justify-end mt-6">{children}</div>
);