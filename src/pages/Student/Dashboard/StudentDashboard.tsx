import { useEffect, useRef, useState } from "react";

import { DataTable,
    SimpleLineChart,
    OverviewCard,
    SectionWrapper,
    SubjectBarChart,ScatterChart,Timeline } from "@/components/dashboard";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { Users, BookOpen,MapPlus  } from "lucide-react";
import { HomeworkService } from "@/api/Services/Teacher/homework.service";
import { paginationQuery } from "@/constants/pagination";
import { toast } from "react-toastify";
import { IHomework } from "@/interfaces/IHomework";
import { IStudent } from "@/interfaces/IStudent";

const StudentDashboard = () => {

    const {user}=useAppSelector((state)=>state.currentUser);

    const [studentHomework,SetHomeworks]=useState<IHomework[]>([]);

    const studentInfo=useRef<IStudent|null>(null);

    /*
    Each student attendance
    */

    useEffect(() => {
        const fetchChartData = async () => {

            const user=JSON.parse(localStorage.getItem('sectionC'));
            studentInfo.current=user;

            if(!user){
                toast.warn('Kindly log in,Auth failed');
                return;
            }
            
            //homework
            const res = await HomeworkService.getAllWithQuery(paginationQuery,{batch:user.batchId,status:'pending'});
            
            if (!res.success) {
                toast.error(res.error.message);
                return 
            }
            
            const {data}=res.data.data;

            SetHomeworks(data);
        }

        fetchChartData();
    },[]);
    
    const subjectPerformance = [
        { name: "Math", value: 85 },
        { name: "Science", value: 78 },
        { name: "English", value: 90 },
        { name: "Physics", value: 70 },
    ];

    const attendanceTrend = [
        { name: "Week 1", value: 80 },
        { name: "Week 2", value: 85 },
        { name: "Week 3", value: 78 },
        { name: "Week 4", value: 90 },
    ];

    const pendingAssignments = [
        { subject: "Math", title: "Algebra HW", due: "Today" },
        { subject: "Science", title: "Lab Report", due: "Tomorrow" },
    ];

    const structurePendingHomeworks=()=>{
        if(studentHomework.length < 0){
            return;
        }

        const pendingHomeworks=studentHomework?.map((homework)=>{
            return {
                subject:homework?.subjectId?.name, 
                title:homework?.title, 
                due:String(homework?.dueDate)?.slice(0,10),
                link:`homework/add/${homework?._id}`,
            }
        });

        return pendingHomeworks;
    }
    
    //deadlines
    const structureUpcomingHomeworks = () => {
        if(studentHomework.length < 0){
            return; //edge-case
        }

        let upcomingHomeworks=studentHomework?.map((homework) => {

            if(new Date().toISOString() > String(homework.dueDate)) return; //base-case

            return {
                title:homework?.title, 
                date:String(homework.dueDate)?.slice(0,10)
            }
        });

        upcomingHomeworks=upcomingHomeworks.filter((val)=>val);

        //getting the part of the array
        if(!upcomingHomeworks || upcomingHomeworks.length<=0){
            return [];
        } else 
            if( upcomingHomeworks.length <= 2){
            return upcomingHomeworks;
        } 
        
        return [upcomingHomeworks[1],upcomingHomeworks[2]]
    }



    // const fetchStudentsCount=async()=>{
    //     await 
    // };

    return (
            <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 p-4 md:p-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                    Student Dashboard
                    </h1>

                    <p className="text-slate-500 mt-2 text-sm md:text-base">
                    Track attendance, assignments, performance and upcoming deadlines.
                    </p>
                </div>

                <div className="rounded-2xl bg-white px-5 py-4 shadow-md border border-slate-200">
                    <p className="text-sm text-slate-500">
                    Welcome Back
                    </p>

                    <h2 className="text-lg font-semibold text-slate-800">
                    {studentInfo.current?.name || "Student"}
                    </h2>
                </div>
                </div>

                {/* Top Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Attendance */}
                <div className="rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-md hover:shadow-2xl transition-all duration-300 p-6">

                    <div className="flex items-start justify-between mb-6">

                    <div>
                        <p className="text-slate-500 text-sm font-medium">
                        Attendance
                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">
                        85%
                        </h2>
                    </div>

                    <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <Users className="w-7 h-7 text-emerald-600" />
                    </div>
                    </div>

                    {/* Progress */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-emerald-500 to-green-600 rounded-full"
                        style={{ width: "85%" }}
                    />
                    </div>

                    <p className="text-xs text-slate-500 mt-3">
                    Consistent attendance performance this month.
                    </p>
                </div>

                {/* Subject Performance */}
                <div className="rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-md hover:shadow-2xl transition-all duration-300 p-6">

                    <div className="flex items-start justify-between mb-6">

                    <div>
                        <p className="text-slate-500 text-sm font-medium">
                        Subject Performance
                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">
                        4
                        </h2>
                    </div>

                    <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <BookOpen className="w-7 h-7 text-indigo-600" />
                    </div>
                    </div>

                    <SubjectBarChart data={subjectPerformance} />
                </div>

                {/* Attendance Trend */}
                <div className="rounded-3xl bg-white/80 backdrop-blur-lg border border-white shadow-md hover:shadow-2xl transition-all duration-300 p-6">

                    <div className="flex items-start justify-between mb-6">

                    <div>
                        <p className="text-slate-500 text-sm font-medium">
                        Attendance Trend
                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">
                        +12%
                        </h2>
                    </div>

                    <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                        <MapPlus className="w-7 h-7 text-orange-600" />
                    </div>
                    </div>

                    <SimpleLineChart data={attendanceTrend} />
                </div>
                </div>

                {/* Bottom Sections */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                {/* Pending Assignments */}
                <div className="xl:col-span-2 rounded-3xl bg-white shadow-md border border-slate-200 overflow-hidden">

                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">

                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                        Pending Assignments
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                        Keep track of pending tasks and submissions.
                        </p>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-orange-100 text-orange-700 text-sm font-medium">
                        {studentHomework?.length || 0} Tasks
                    </div>
                    </div>

                    <div className="p-4">
                    <DataTable
                        columns={[
                        { key: "subject", label: "Subject", },
                        { key: "title", label: "Task" },
                        { key: "due", label: "Due" },
                        ]}
                        data={structurePendingHomeworks() || []}
                    />
                    </div>
                </div>

                {/* Homework Deadlines */}
                <div className="rounded-3xl bg-white shadow-md border border-slate-200 overflow-hidden">

                    <div className="px-6 py-5 border-b border-slate-100">

                    <h2 className="text-xl font-semibold text-slate-800">
                        Upcoming Deadlines
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Important homework submission dates.
                    </p>
                    </div>

                    <div className="p-6">
                    <Timeline data={structureUpcomingHomeworks()} />
                    </div>
                </div>
                </div>

                {/* Extra Performance Section */}
                <div className="mt-8 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-xl">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>
                    <h2 className="text-2xl font-bold">
                        Academic Performance Summary
                    </h2>

                    <p className="text-blue-100 mt-2 max-w-2xl">
                        Your academic progress has improved steadily over the last few weeks.
                        Continue maintaining attendance and completing assignments on time.
                    </p>
                    </div>

                    <div className="flex gap-6">

                    <div>
                        <p className="text-blue-100 text-sm">
                        Assignments
                        </p>

                        <h3 className="text-3xl font-bold">
                        {studentHomework?.length || 0}
                        </h3>
                    </div>

                    <div>
                        <p className="text-blue-100 text-sm">
                        Performance
                        </p>

                        <h3 className="text-3xl font-bold">
                        A+
                        </h3>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            );
};

export default StudentDashboard;