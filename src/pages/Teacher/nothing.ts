// const handleCreateTeacherBio = async():Promise<boolean> => {
//       const isValid=handleValidationOF(teacherBioFormSchema,basicForm);

//       setBasicForm((prev)=>({...prev, experience:Number(prev.experience)}));

//       if(!isValid.success){
//         return isValid.success;
//       }

//       const formData = new FormData();

//     // text fields      
//       const fieldsToAvoid=["firstName","lastName","email","phone","gender","qualification"];  

//       for(const field of fieldsToAvoid){
//         formData.append(field, basicForm[field]);
//       }

//       // dates → always send as string
//       if (basicForm.dateOfBirth) {
//         formData.append("dateOfBirth", new Date(basicForm.dateOfBirth).toISOString());
//       }


//       // numbers → convert to string
//       formData.append("experience", String(basicForm.experience));

//       // single file
//       if (basicForm.profilePhoto) {
//         formData.append("profile", basicForm.profilePhoto);
//       }

//       // multiple files / mixed array
//       basicForm.documents?.forEach((doc) => {
//       if (doc) {
//         // new upload
//         formData.append("docs", doc);
//       } else if (typeof doc === "string") {
//         // existing document (url / filename)
//         formData.append("docs", doc);
//       }
//     });


//         const config:HandleApiOptions<FormData>={
//           endPoint:"/teacher/bio/create",
//           method:"post",
//           payload:formData,
//           headers:{role:"School"}
//         };

//         const res =
//         await 
//         handleApi<FormData,Partial<ITeacherBio>>(config);

//         if(!res.success){
//           toast.error("Cannot Create the teacher Err:500");
//           console.log("@AddTeacher.page res",res);
//           return false;
//         }
//         const teacher=res.data.data;


//         //Store the teacher._id at LS=localStorage
//         //later delete the ._id form the LS;
//         //after adding teacher_professionalism data.
//         localStorage.setItem("teacherId",JSON.stringify(teacher._id));
//         setTeacherId(teacher._id);
//         toast.success("Updated..")
//         return res.success;
//     };