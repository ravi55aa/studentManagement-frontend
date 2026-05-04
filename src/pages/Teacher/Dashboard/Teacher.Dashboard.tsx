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
import { IAcademicSubject } from "@/interfaces/ISchool";
import { AttendanceService } from "@/api/Services/Student/attendanceService";

const TeacherDashboard = () => {
    //Store Teachers
    const {user}=useAppSelector((state)=>state.currentUser);
    const teacherInfo=useRef<{bio:ITeacherBio|{},professional:ITeacher|{}}>({bio:{},professional:{}});

    const [chartData,setChartData]=useState<{students:IStudent[],subjects:IAcademicSubject[]}>({
        students:[],
        subjects:[]
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

            const [studentResponse,attendance]=await Promise.all([
                StudentService.getALLWithQuery({batch:batch._id}),
                AttendanceService.getAttendanceOfAcademicYear(batch?._id,2026)//update with current batchId
            ]);

            const studentsData=studentResponse.data.data;
            setChartData((prev)=>({...prev,students:studentsData}));

            console.log('@attendanceService attendance',attendance);

            return studentsData;
        }

        fetchChartData();
    },[]);

    //This requires some of the mock data to be in the given field
    // attendanceData,
    // batchData,
    // subjectData,
    // courseData,
    // Pending Homeworks 

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

    const pendingHomework = [
        { student: "Rahul", subject: "Math", due: "Today" },
        { student: "Anu", subject: "Science", due: "Tomorrow" },
    ];

    const assignments = [
        { course: "Math", title: "Algebra Test", date: "10 Apr" },
        { course: "Science", title: "Lab Work", date: "12 Apr" },
    ];

    // const fetchStudentsCount=async()=>{
    //     await 
    // };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        
        {/*  Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <OverviewCard
                title="Total Students"
                value={chartData.students?.length||'100'}
                icon={<Users className="text-green-600" />}
            >

            <SimpleLineChart data={attendanceData} />

            </OverviewCard>
            
            <OverviewCard
                title="Assigned Subjects Overview"
                value="1"
                icon={<BookOpen className="text-green-600" />}
            >
                <SubjectBarChart data={subjectData} />
            </OverviewCard>

            <OverviewCard
                title="Batches per Teacher"
                value="1"
                icon={<MapPlus  className="text-green-600" />}
            >
                <ScatterChart data={batchData} />
            </OverviewCard>

        </div>

        {/*  Pending Homework */}
        <SectionWrapper title="Pending Homeworks">
            <DataTable
            columns={[
                { key: "student", label: "Student" },
                { key: "subject", label: "Subject" },
                { key: "due", label: "Due" },
            ]}
            data={pendingHomework}
            />
        </SectionWrapper>

        {/*  Course Assignments */}
        <SectionWrapper title="Course Assignments">
            <DataTable
            columns={[
                { key: "course", label: "Course" },
                { key: "title", label: "Title" },
                { key: "date", label: "Date" },
            ]}
            data={assignments}
            />
        </SectionWrapper>

        </div>
    );
};

export default TeacherDashboard;