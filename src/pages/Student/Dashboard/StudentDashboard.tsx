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

const StudentDashboard = () => {

    const {user}=useAppSelector((state)=>state.currentUser);

    const [studentHomework,SetHomeworks]=useState<IHomework[]>([]);

    /*
    Each student attendance
    */

    useEffect(() => {
        const fetchChartData = async () => {

            const user=JSON.parse(localStorage.getItem('sectionC'));
                    
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
            
            const {data,page,totalPages,total}=res.data.data;

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
                due:String(homework.dueDate).slice(0,10)}
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
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        
        {/*  Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <OverviewCard
            title="Attendance"
            value="85%"
            >
            <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }} />
            </div>
            </OverviewCard>
            
            <OverviewCard
                title="Assigned Subjects Overview"
                value="1"
                icon={<BookOpen className="text-green-600" />}
            >
                <SubjectBarChart data={subjectPerformance} />
            </OverviewCard>

            <OverviewCard
                title="Attendance Trend"
                value=""
                icon={<MapPlus  className="text-green-600" />}
            >
                <SimpleLineChart data={attendanceTrend} />
            </OverviewCard>

        </div>

        {/*  Pending Homework */}
        <SectionWrapper title="Pending Assignments">
            <DataTable
                columns={[
                { key: "subject", label: "Subject" },
                { key: "title", label: "Task" },
                { key: "due", label: "Due" },
                ]}
                data={structurePendingHomeworks()}
            />
        </SectionWrapper>

        {/*  Course Assignments */}
        <SectionWrapper title="Homework Deadlines">
            <Timeline data={structureUpcomingHomeworks()} />
        </SectionWrapper>

        </div>
    );
};

export default StudentDashboard;