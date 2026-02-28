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









/*Table

 <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
            <thead className="border-b bg-white">
                <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Qualification</th>
                <th className="text-left px-4 py-2">Phone</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Gender</th>
                <th className="text-center px-4 py-2">Actions</th>
                </tr>
            </thead>

            <tbody>
                {teachersStore?.bio?.map((teacher:ITeacherBio, index:number) => (
                <tr
                    key={teacher?.email}
                    className={`border-t ${
                    index % 2 === 1 ? "bg-green-50" : ""
                    }`}
                >
                    <td className="px-4 py-3 flex items-center gap-3">
                    <img
                        src={typeof teacher?.profilePhoto=="string" 
                            && 
                            (teacher?.profilePhoto ?? profileImg) }
                        alt={teacher?.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    {teacher?.firstName}
                    </td>

                    <td className="px-4 py-3">{teacher?.qualification}</td>
                    <td className="px-4 py-3">{teacher?.phone}</td>
                    <td className="px-4 py-3">{teacher?.email}</td>
                    <td className="px-4 py-3">{teacher?.gender}</td>

                    <td className="px-4 py-3">
                    <div className="flex justify-center gap-4 text-gray-600">
                        
                        <button onClick={() => handleOpen(teacher)}>
                        <Eye className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                            </button>

                            <TeacherDetailsModal
                            open={isOpen}
                            teacher={selectedTeacher}
                            onClose={() => setIsOpen(false)}
                            />

                        <Link to={`edit/${teacher?._id}`}>
                        <Pencil className="w-4 h-4 hover:text-green-700 cursor-pointer" />
                        </Link>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div> 
*/