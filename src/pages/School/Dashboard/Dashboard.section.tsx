import { useEffect, useState } from "react";

import {
    SimpleLineChart,
    OverviewCard,
    SectionWrapper,
    SubjectBarChart,
    PieChart,
} from "@/components/dashboard";

import { useAppSelector } from "@/hooks/useStoreHooks";
import { Users, School, Layers, Search } from "lucide-react";

import { BatchService } from "@/api/Services/batch.service";
import { StudentService } from "@/api/Services/Student/student.service";
import { AttendanceService } from "@/api/Services/Student/attendanceService";

import { IStudent } from "@/interfaces/IStudent";
import { IAcademicSubject, IBatches } from "@/interfaces/ISchool";
import DashboardSection from "../DashBoardHome.page";
import { TeacherService } from "@/api/Services/teacher.service";
import { paginationQuery } from "@/constants/pagination";
import { IGetAllTeachers } from "@/interfaces/ITeacher";
import { SubjectService } from "@/api/Services/subject.service";

const SchoolDashboard = () => {
    const { user } = useAppSelector((state) => state.currentUser);

    const [chartData, setChartData] = useState<{
        students: IStudent[];
        subjects: IAcademicSubject[];
        teachers: IGetAllTeachers;
        batches: IBatches[];
    }>({
        students: [],
        subjects: [],
        teachers: null,
        batches : [],
    });

    const [otherChartData,setOtherChartData]=useState<{name:string,value:number}[]>([]);

    const [cardData,setCardData]=useState<{bestBatch:string,lastBatch:string,activeDays:number}>();

    const [selectedYear, setSelectedYear] = useState("2026");
    const [selectedBatch, setSelectedBatch] = useState("all");

    useEffect(() => {
        const fetchChartData = async () => {
        try {
            const res = await BatchService.getAllWithQuery(
            { batchCounselor: user.id },
            { page: 0, limit: 100 }
            );

            const batch = res.data.data.data[0];

            const [studentResponse,teacherResponse,batchResponse,subjectResponse] = await Promise.all([
                StudentService.getALLWithQuery({
                    batch: batch._id }),
                TeacherService.getAll(paginationQuery),
                BatchService.getAll(paginationQuery),
                SubjectService.getAll(),
            ]);

            setChartData(
                { 
                    students: studentResponse.data.data, 
                    teachers: teacherResponse.data.data.data[0], 
                    batches: batchResponse.data.data.data, 
                    subjects: subjectResponse?.data?.data||[],
                });


                //after every successful render 
                //call this below function

        } catch (err) {
            console.error(err);
        }
        };

        fetchChartData();
    }, [selectedYear, selectedBatch]);

    useEffect(()=>{
        (async()=>{
            await handleBatchPerformanceData();
            handleCardData();

        })()
    },[chartData.batches]);

    //  Derived values
    const totalStudents = chartData.students?.length ||0;
    const totalStaff = chartData.teachers?.teacherBio?.length||0;
    const totalBatches = chartData.batches?.length||0;

    //row1
    const handleStudentsBatchData = () => {
        const batchMap: Record<string, number> = {};

        //  Create quick lookup (O(1) instead of find)
        const batchLookup: Record<string, string> = {};

        chartData.batches.forEach((batch) => {
            batchLookup[batch._id] = batch.name;
        });

        //  Count students per batch
        chartData.students.forEach((student: IStudent) => {
            const batchName = batchLookup[student.batch];

            if (batchName) {
            batchMap[batchName] = (batchMap[batchName] || 0) + 1;
            }
        });
        
        return handlePaginateValue(batchMap) as {name:string,value:number}[];
    };
    
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
    
    async function handleBatchPerformanceData() {

        const batchesPerformance = await Promise.all(
            chartData.batches?.map(async (batch) => {
                const res = await AttendanceService.getAttendanceOfAcademicYear(
                    batch._id,
                    Number(selectedYear)
                );

                if (res.success) {
                    const data=res?.data?.data[0];
                    const percent=data?.attendancePercentage

                    return {name:batch.name,value:Number(Math.floor(percent))};
                }

                return null;
            })
        );

        const filteredData = batchesPerformance?.filter(Boolean);

        setOtherChartData(filteredData);
        return [];
    };
    
    //row2
    const attendanceTrend = [
        { name: "Jan", value: 80 },
        { name: "Feb", value: 85 },
        { name: "Mar", value: 78 },
        { name: "Apr", value: 88 },
    ];

    const handleSubjectDistribution = () => {

        if(!chartData.teachers || !chartData.subjects) return;

        const subjectMap={};

        //  Create quick lookup (O(1) instead of find)
        const subjectLookup: Record<string, string> = {};

        chartData.subjects?.forEach((subject) => {
            subjectLookup[subject._id] = subject.name;
        });

        //  Count students per batch
        chartData.teachers.teachersSchoolData?.forEach((teacher)=>{

            for(let subjectId of teacher?.assignedSubjects){
                const subject = subjectLookup[subjectId];


                if (subject) {
                subjectMap[subject] = (subjectMap[subject] || 0) + 1;
                }
            }
        });

        for(let [key,val] of Object.entries(subjectLookup)){
            if(!subjectMap[val]){
                subjectMap[val]=0;
            }
        }

        return handlePaginateValue(subjectMap);
    }

    function handleCardData(){
        if(!otherChartData.length){ //base-case
            return;
        }

        const sortData=Array.from(otherChartData)?.sort((a,b)=>a.value-b.value);
        let n=otherChartData?.length;

        const bestBatchCardData=sortData[n-1]?.name;
        const lastBatchCardData=sortData[0]?.name;

        const activeDaysCardData=sortData?.reduce((acc,val)=>acc+val.value,0);
        
        setCardData({
            bestBatch:bestBatchCardData,
            lastBatch:lastBatchCardData,
            activeDays:activeDaysCardData,
        });

        return true; 
    }


    return (
        <div className="p-5 bg-gray-50 min-h-screen space-y-6">
        {/*  HERO HEADER */}
        <div className="bg-linear-to-r from-green-600 to-emerald-500 text-white p-6 rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold">School Dashboard</h1>
            <p className="text-sm opacity-90">
            Monitor performance, attendance, and overall analytics
            </p>
        </div>

        {/*  FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-green-100">

            <div className="flex gap-3 flex-wrap">

            <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400"
            >
                <option value="all">All Batches</option>
                <option value="A">Batch A</option>
                <option value="B">Batch B</option>
            </select>

            <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400"
            >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
            </select>

            </div>

            <span className="text-sm text-gray-500"><Search className="text-grey-600 inline-flex w-4 h-4 center mr-1"  />Search</span>
        </div>

        {/*  OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <OverviewCard
            title="Total Students"
            value={totalStudents}
            icon={<Users className="text-green-600" />}
            />

            <OverviewCard
            title="Total Staff"
            value={totalStaff}
            icon={<School className="text-green-600" />}
            />

            <OverviewCard
            title="Active Batches"
            value={totalBatches}
            icon={<Layers className="text-green-600" />}
            />

        </div>

        {/*  HIGHLIGHT STRIP */}
        <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-green-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Best Batch</p>
            <h3 className="text-lg font-semibold text-green-700">{cardData?.bestBatch || "Batch A"}</h3>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Low Attendance</p>
            <h3 className="text-lg font-semibold text-yellow-700">{cardData?.lastBatch || "Batch C"}</h3>
            </div>

            <div className="bg-blue-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Active Today</p>
            <h3 className="text-lg font-semibold text-blue-700">{cardData?.activeDays || '980'}</h3>
            </div>

        </div>

        {/*  CHART ROW 1 */}
        <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
            <SectionWrapper title="Students per Batch">
                <SubjectBarChart title="Students Distribution" 
                data={handleStudentsBatchData()} />
            </SectionWrapper>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
            <SectionWrapper title="Batch Performance">
                {otherChartData.length &&
                <SubjectBarChart title="Batch Distribution" data={otherChartData} />}
            </SectionWrapper>
            </div>

        </div>

        <DashboardSection/>

        {/*  CHART ROW 2 */}
        <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
            <SectionWrapper title="Attendance Trends">
                <SimpleLineChart data={attendanceTrend} />
            </SectionWrapper>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
            <SectionWrapper title="Teacher Allocation">
                <PieChart data={handleSubjectDistribution()} />
            </SectionWrapper>
            </div>

        </div>

        </div>
    );
};

export default SchoolDashboard;