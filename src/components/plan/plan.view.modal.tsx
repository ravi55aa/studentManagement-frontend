import {
    BadgeCheck,
    Clock3,
    GraduationCap,
    ShieldCheck,
    Users,
    UserSquare2,
    X,
} from "lucide-react";

export const PlanViewModal = ({
    plan,
    isOpen,
    onClose,
    }) => {

    if (!isOpen || !plan) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

        {/* ---------- Modal ---------- */}
        <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">

            {/* ---------- Header ---------- */}
            <div className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50 px-8 py-7">

            {/* Close */}
            <button
                onClick={onClose}
                className="
                absolute right-6 top-6
                flex h-11 w-11 items-center justify-center
                rounded-2xl bg-white shadow-sm
                transition-all duration-200
                hover:bg-slate-100
                "
            >
                <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                {/* Icon */}
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                <GraduationCap className="w-12 h-12" />
                </div>

                {/* Plan Info */}
                <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
                    Subscription Plan
                </div>

                <h1 className="mt-4 text-3xl font-bold text-slate-800">
                    {plan?.name}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Complete plan overview including pricing,
                    benefits, duration and platform limits.
                </p>
                </div>
            </div>
            </div>

            {/* ---------- Body ---------- */}
            <div className="max-h-[75vh] overflow-y-auto bg-slate-50/40 p-6 md:p-8 space-y-8">

            {/* ---------- Overview ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Price */}
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>

                <p className="mt-5 text-sm text-slate-500">
                    Plan Price
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-800">
                    ₹{plan?.finalAmount}
                </h2>
                </div>

                {/* Duration */}
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <Clock3 className="w-5 h-5 text-emerald-700" />
                </div>

                <p className="mt-5 text-sm text-slate-500">
                    Duration
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-800">
                    {plan?.duration}
                </h2>

                <p className="text-sm text-slate-400">
                    Days
                </p>
                </div>

                {/* Benefits Count */}
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <BadgeCheck className="w-5 h-5 text-emerald-700" />
                </div>

                <p className="mt-5 text-sm text-slate-500">
                    Benefits
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-800">
                    {plan?.benefits?.length || 0}
                </h2>

                <p className="text-sm text-slate-400">
                    Included Features
                </p>
                </div>
            </div>

            {/* ---------- Benefits ---------- */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <BadgeCheck className="w-5 h-5 text-emerald-700" />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                    Plan Benefits
                    </h2>

                    <p className="text-sm text-slate-500">
                    Features included in this subscription
                    </p>
                </div>
                </div>

                {plan?.benefits?.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {plan.benefits.map((benefit, i) => (

                    <div
                        key={i}
                        className="
                        flex items-start gap-4
                        rounded-2xl border border-slate-200
                        bg-slate-50/70 p-5
                        "
                    >

                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                        <BadgeCheck className="w-4 h-4 text-emerald-700" />
                        </div>

                        <div>
                        <p className="font-medium leading-6 text-slate-700">
                            {benefit}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
                    No Benefits Added
                </div>
                )}
            </div>

            {/* ---------- Limits ---------- */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <Users className="w-5 h-5 text-emerald-700" />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                    Usage Limits
                    </h2>

                    <p className="text-sm text-slate-500">
                    Maximum allowed platform resources
                    </p>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Students */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <Users className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        Students Limit
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-slate-800">
                        {plan?.maxStudents || "Unlimited"}
                        </h3>
                    </div>
                    </div>
                </div>

                {/* Teachers */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <UserSquare2 className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                        Teachers Limit
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-slate-800">
                        {plan?.maxTeachers || "Unlimited"}
                        </h3>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* ---------- Footer ---------- */}
            <div className="flex justify-end">

                <button
                onClick={onClose}
                className="
                    rounded-2xl
                    bg-gradient-to-r from-emerald-600 to-green-600
                    px-6 py-3
                    text-sm font-semibold text-white
                    shadow-md
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-lg
                "
                >
                Close
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};