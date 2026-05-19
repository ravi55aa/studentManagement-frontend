import { useEffect, useRef, useState } from "react";

import { DataTable,
    SimpleLineChart,
    OverviewCard,
    SectionWrapper,
    SubjectBarChart,ScatterChart } from "@/components/dashboard";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { ITeacher, ITeacherBio } from "@/interfaces/ITeacher";
import { Users, BookOpen,MapPlus  } from "lucide-react";
import { BatchService } from "@/api/Services/batch.service";
import { StudentService } from "@/api/Services/Student/student.service";
import { IStudent } from "@/interfaces/IStudent";
import { IAcademicCourse, IAcademicSubject } from "@/interfaces/ISchool";
import { AttendanceService } from "@/api/Services/Student/attendanceService";
import { IHomework } from "@/interfaces/IHomework";
import { HomeworkService } from "@/api/Services/Teacher/homework.service";
import { paginationQuery } from "@/constants/pagination";
import { CourseService } from "@/api/Services/course.service";
import { SubjectService } from "@/api/Services/subject.service";
import { TeacherService } from "@/api/Services/teacher.service";
import { Teachers } from "@/types/types";

const TeacherDashboard = () => {
    //Store Teachers
    const {user}=useAppSelector((state)=>state.currentUser);
    const teacherInfo=useRef<Teachers>({teacherBio:null,teacher:null});

    const [chartData,setChartData]=useState<
    {
        students:IStudent[],
        subjects:IAcademicSubject[],
        homeworks:IHomework[],
        courses:IAcademicCourse[]}>
        ({
        students:[],
        subjects:[],
        homeworks:[],    
        courses:[],    
    });

    const [batchData,SetBatchData] = useState <{ 
        name:string,attendance:number,performance:number
    }[]>
    ([
        { name: "Rahul", attendance: 90, performance: 85 },
        { name: "Anu", attendance: 70, performance: 60 },
        { name: "Kiran", attendance: 95, performance: 92 },
        { name: "Meera", attendance: 60, performance: 55 },
    ]);

    /*
    Each student attendance
    */

    useEffect(() => {
        const fetchChartData = async () => {
            
            const res=await BatchService.getAllWithQuery({batchCounselor:user.id},{page:0,limit:100});

            if(!res.success) {
                throw new Error(res.error.message);
            }

            const {data}=res.data.data;
            const batch=data[0];

            const [teacherRes,studentResponse,attendance,homeworkRes,coursesRes,subjectRes]=await Promise.all([
                TeacherService.getById(user.id),
                StudentService.getALLWithQuery({batch:batch._id}),
                AttendanceService.getAttendanceOfAcademicYear(batch?._id,2026),
                HomeworkService.getAllWithQuery(paginationQuery,{teacherId:user?.id,status:'pending'}),
                CourseService.getAll(),
                SubjectService.getAll(),
            ]);

            teacherInfo.current=teacherRes.data.data; //set the teacher

            const studentsData=studentResponse.data.data;
            const homeworks=homeworkRes.data.data;
            const courses=coursesRes.data.data;
            const subjects=subjectRes.data.data;

            setChartData((prev)=>(
                {...prev,
                    students:studentsData,
                    homeworks:homeworks.data,
                    courses:courses.courses,
                    subjects:subjects
                }));

            return studentsData;
        }

        fetchChartData();
    },[]);

  //  mock data (replace with API)
    const attendanceData = [
        { name: "Mon", value: 80 },
        { name: "Tue", value: 85 },
        { name: "Wed", value: 78 },
        { name: "Thu", value: 90 },
        { name: "Fri", value: 88 },
    ];
    
    const subjectData = [
        { name: "Math", value: 40 },
        { name: "Science", value: 30 },
        { name: "English", value: 25 },
        { name: "Physics", value: 20 },
    ];

    const structurePendingHomeworks=()=>{
        if(chartData.homeworks.length < 0){
            return;
        }

        const pendingHomeworks=chartData.homeworks?.map((homework)=>{
            return {
                subject:homework?.subjectId?.name, 
                title:homework?.title, 
                due:String(homework.dueDate).slice(0,10),
                link:`homework/view/submissions/${homework._id}`
            }
        });

        return pendingHomeworks;
    }
    
    const handleStructureCourses=()=>{
        if(chartData.courses.length < 0){
            return;
        }

        const structureCourses=chartData.courses?.map((course)=>{
            return {
                course:course?.name, 
                code:course?.code, 
                date:String(course.schedule.startDate).slice(0,10)}
        });

        return structureCourses;
    }

    function handlePaginateValue(data):{name:string,value:unknown}[]{
        //  Convert to array
        let result = Object.entries(data).map(([name, value]) => ({
            name,
            value,
        }));

        //  Limit to top 10
        result = result.slice(0, 10);

        return result;
    }

    //Shape the subject
    const handleSubjectDistribution = () => {

            if (!user || !chartData.subjects?.length) return [];

            const subjectMap: Record<string, number> = {};

            const teacherSubjects =
                teacherInfo.current?.teacher?.assignedSubjects || [];

            // Quick lookup
            const subjectLookup: Record<string, string> = {};

            chartData.subjects.forEach((subject) => {
                subjectLookup[subject._id] = subject.name;
            });
            
            // Count subjects
            for (const subjectId of teacherSubjects) {
                console.log('subjectId',subjectId)

                
                const subjectName = subjectLookup[subjectId._id];
                
                if (subjectName) {
                    console.log('subjectId',subjectId);
                    subjectMap[subjectName] =
                        (subjectMap[subjectName] || 0) + 10;
                }
            }

            // Add missing subjects with 0
            Object.values(subjectLookup).forEach((subjectName) => {

                if (!(subjectName in subjectMap)) {
                    subjectMap[subjectName] = 0;
                }
            });

            return handlePaginateValue(subjectMap);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-emerald-50 p-4 md:p-8">
            
            {/* Header */}
            <div className="mb-8 flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Teacher Dashboard
            </h1>

            <p className="text-slate-500 text-sm md:text-base">
                Monitor students, assignments, attendance and academic progress.
            </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Total Students */}
            <div className="group rounded-3xl border border-white/40 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-2xl transition-all duration-300 p-5">
                
                <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-slate-500 text-sm font-medium">
                    Total Students
                    </p>

                    <h2 className="text-4xl font-bold text-slate-800 mt-1">
                    {chartData.students?.length || "100"}
                    </h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <Users className="text-emerald-600 w-7 h-7" />
                </div>
                </div>

                <div className="mt-6">
                <SimpleLineChart data={attendanceData} />
                </div>
            </div>

            {/* Subjects */}
            <div className="group rounded-3xl border border-white/40 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-2xl transition-all duration-300 p-5">
                
                <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-slate-500 text-sm font-medium">
                    Assigned Subjects
                    </p>

                    <h2 className="text-4xl font-bold text-slate-800 mt-1">
                    {chartData.subjects?.length || "1"}
                    </h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                    <BookOpen className="text-indigo-600 w-7 h-7" />
                </div>
                </div>

                <div className="mt-6">
                <SubjectBarChart data={handleSubjectDistribution()} />
                </div>
            </div>

            {/* Batches */}
            <div className="group rounded-3xl border border-white/40 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-2xl transition-all duration-300 p-5">
                
                <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-slate-500 text-sm font-medium">
                    Batches Overview
                    </p>

                    <h2 className="text-4xl font-bold text-slate-800 mt-1">
                    {chartData.courses?.length || "1"}
                    </h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <MapPlus className="text-orange-600 w-7 h-7" />
                </div>
                </div>

                <div className="mt-6">
                <ScatterChart data={batchData} />
                </div>
            </div>
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            {/* Pending Homework */}
            <div className="rounded-3xl bg-white shadow-md border border-slate-200 overflow-hidden">

                <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                    Pending Homeworks
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                    Track upcoming homework deadlines.
                    </p>
                </div>
                </div>

                <div className="p-4">
                <DataTable
                    columns={[
                    { key: "subject", label: "Subject" },
                    { key: "title", label: "Title" },
                    { key: "due", label: "Due" },
                    ]}
                    data={structurePendingHomeworks() || []}
                />
                </div>
            </div>

            {/* Course Assignments */}
            <div className="rounded-3xl bg-white shadow-md border border-slate-200 overflow-hidden">

                <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                    Course Assignments
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                    Academic courses assigned for the term.
                    </p>
                </div>
                </div>

                <div className="p-4">
                <DataTable
                    columns={[
                    { key: "course", label: "Course" },
                    { key: "code", label: "Code" },
                    { key: "date", label: "Date" },
                    ]}
                    data={handleStructureCourses() || []}
                />
                </div>
            </div>
            </div>
        </div>
        );
};

export default TeacherDashboard;