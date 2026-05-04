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
import { IAcademicSubject } from "@/interfaces/ISchool";
import DashboardSection from "../DashBoardHome.page";

const SchoolDashboard = () => {
    const { user } = useAppSelector((state) => state.currentUser);

    const [chartData, setChartData] = useState<{
        students: IStudent[];
        subjects: IAcademicSubject[];
    }>({
        students: [],
        subjects: [],
    });

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

            const [studentResponse] = await Promise.all([
            StudentService.getALLWithQuery({ batch: batch._id }),
            AttendanceService.getAttendanceOfAcademicYear(
                batch._id,
                Number(selectedYear)
            ),
            ]);

            setChartData({
            students: studentResponse.data.data,
            subjects: [],
            });
        } catch (err) {
            console.error(err);
        }
        };

        fetchChartData();
    }, [selectedYear, selectedBatch]);

    //  Derived values
    const totalStudents = chartData.students.length;
    const totalStaff = 85;
    const totalBatches = 32;

    // mock data (replace with API later)
    const studentBatchData = [
        { name: "Batch A", value: 40 },
        { name: "Batch B", value: 35 },
        { name: "Batch C", value: 50 },
    ];

    const performanceData = [
        { name: "Batch A", value: 78 },
        { name: "Batch B", value: 85 },
        { name: "Batch C", value: 72 },
    ];

    const attendanceTrend = [
        { name: "Jan", value: 80 },
        { name: "Feb", value: 85 },
        { name: "Mar", value: 78 },
        { name: "Apr", value: 88 },
    ];

    const teacherData = [
        { name: "Math", value: 10 },
        { name: "Science", value: 8 },
        { name: "English", value: 6 },
    ];

    return (
        <div className="p-5 bg-gray-50 min-h-screen space-y-6">
        {/*  HERO HEADER */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-2xl shadow-md">
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
            <h3 className="text-lg font-semibold text-green-700">Batch B</h3>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Low Attendance</p>
            <h3 className="text-lg font-semibold text-yellow-700">Batch C</h3>
            </div>

            <div className="bg-blue-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Active Today</p>
            <h3 className="text-lg font-semibold text-blue-700">980</h3>
            </div>

        </div>

        {/*  CHART ROW 1 */}
        <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
            <SectionWrapper title="Students per Batch">
                <SubjectBarChart data={studentBatchData} />
            </SectionWrapper>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition">
            <SectionWrapper title="Batch Performance">
                <SubjectBarChart data={performanceData} />
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
                <PieChart data={teacherData} />
            </SectionWrapper>
            </div>

        </div>

        </div>
    );
};

export default SchoolDashboard;