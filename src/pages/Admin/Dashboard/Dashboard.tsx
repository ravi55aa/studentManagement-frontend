import { PlanService } from "@/api/Services/Admin/plan.service";
import { SchoolService } from "@/api/Services/school.service";
import { SimpleLineChart, SubjectBarChart } from "@/components/dashboard";
import { IPlan } from "@/interfaces/IPlan";
import { ISchoolFormData } from "@/interfaces/IRegister";
import {
    Building2,
    GraduationCap,
    TrendingUp,
    Users,
    Activity,
    ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IPageData {
    schools:ISchoolFormData[],
    plans:IPlan[],
}


const SuperAdminDashboard = () => {
    const [pageData,setPageData] = useState<IPageData>();
    
    //Fetch belongings
    useEffect(()=>{

        const fetchDetails = async () => {
            
            const [schoolRes,planRes] = await Promise.all([
                
                SchoolService.getAllSchool(),

                PlanService.getAll({isActive:true}),

            ]);

            //handle failures  
            //___-__//

            setPageData({schools:schoolRes.data.data||[], plans:planRes.data.data||[]});
            return true;
        };

        fetchDetails();
    },[]);


    /* Mock Analytics */
    const schoolGrowth = [
        { name: "Jan", value: 5 },
        { name: "Feb", value: 8 },
        { name: "Mar", value: 12 },
        { name: "Apr", value: 16 },
        { name: "May", value: 20 },
    ];

    const filterPlanDistribution = ():{name:string,value:number}[] => {

        if(!pageData?.plans?.length) {
            return;
        }

        let planLookUp={};

        pageData.plans.forEach((plan:IPlan)=>{
            planLookUp[plan.name]=(planLookUp[plan.name] || 0) + 1;
        });
        
        const planDistribution = Object.entries(planLookUp).map(([name, value]) => ({
            name,
            value,
        }));

        return planDistribution as {name:string,value:number}[];
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-green-50 p-4 md:p-7">

        {/* ---------- Header ---------- */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
                Super Admin Panel
            </div>

            <h1 className="mt-4 text-4xl font-bold text-slate-800">
                Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
                Monitor schools, subscriptions and platform activity
            </p>
            </div>
        </div>

        {/* ---------- Overview Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Total Schools */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>
                <p className="text-sm text-slate-500">
                    Total Schools
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    {pageData?.schools?.length || 0}
                </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100">
                <Building2 className="w-7 h-7 text-emerald-700" />
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <ArrowUpRight className="w-4 h-4" />
                +12% this month
            </div>
            </div>

            {/* Active Plans */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>
                <p className="text-sm text-slate-500">
                    Subscription Plans
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    {pageData?.plans?.length || 0}
                </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100">
                <GraduationCap className="w-7 h-7 text-emerald-700" />
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                Active Pricing Models
            </div>
            </div>

            {/* Revenue */}
            <div className="rounded-[30px] relative border border-slate-200 p-6 shadow-sm">
                <span className="absolute top-[50%] left-[35%] font-bold text-green-600">Loading...</span>

            <div className="flex items-start justify-between blur-sm">

                <div>
                <p className="text-sm text-slate-500">
                    Monthly Revenue
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    ₹48K
                </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100">
                <TrendingUp className="w-7 h-7 text-emerald-700" />
                </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm blur-sm text-emerald-600 font-medium">
                +8.2% from last month
            </div>
            </div>

            {/* Active Users */}
            <div className="rounded-[30px] border relative border-slate-200 bg-white p-6 shadow-sm">

                <span className="absolute top-[50%] left-[35%] font-bold text-green-600">Loading...</span>

            <div className="flex items-start blur-sm justify-between">

                <div>
                <p className="text-sm text-slate-500">
                    Active Admins
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    19
                </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100">
                <Users className="w-7 h-7 text-emerald-700" />
                </div>
            </div>

            <div className="mt-6 flex items-center blur-sm gap-2 text-sm text-emerald-600 font-medium">
                Platform Active Users
            </div>
            </div>
        </div>

        {/* ---------- Charts ---------- */}
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* School Growth */}
            <div className="xl:col-span-2 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div>
                <h2 className="text-2xl font-bold text-slate-800">
                    School Growth
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Monthly onboarding statistics
                </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <Activity className="w-5 h-5 text-emerald-700" />
                </div>
            </div>

            <SimpleLineChart data={schoolGrowth} />
            </div>

            {/* Plan Distribution */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-slate-800">
                Plan Usage
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                Active school subscriptions
                </p>
            </div>

            <SubjectBarChart data={filterPlanDistribution()} title="Plan Distribution" />
            </div>
        </div>

        {/* ---------- Recent Activity ---------- */}
        <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
                Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Latest platform actions and updates
            </p>
            </div>

            <div className="space-y-4">

            {[
                {
                title: "New school registered",
                desc: "Green Valley Public School joined the platform",
                time: "2 mins ago",
                },
                {
                title: "Plan upgraded",
                desc: "Sunrise Academy upgraded to Premium Plan",
                time: "15 mins ago",
                },
                {
                title: "New plan created",
                desc: "Enterprise School Plan was added",
                time: "1 hour ago",
                },
            ].map((activity, i) => (

                <div
                key={i}
                className="
                    flex items-start justify-between
                    rounded-2xl border border-slate-200
                    bg-slate-50/70 px-5 py-4
                "
                >

                <div className="flex items-start gap-4">

                    <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500" />

                    <div>

                    <h3 className="font-semibold text-slate-800">
                        {activity.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {activity.desc}
                    </p>
                    </div>
                </div>

                <span className="text-xs text-slate-400 whitespace-nowrap">
                    {activity.time}
                </span>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default SuperAdminDashboard;