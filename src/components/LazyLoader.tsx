// const AppLoader = () => {
//     return (
//         <div className="flex h-screen items-center justify-center bg-white">
//         <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-black"></div>
//         </div>
//     );
// };

import { GraduationCap } from "lucide-react";

const AppLoader = () => {
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-50">

        {/* Background Glow */}
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

        {/* Loader Card */}
        <div
            className="
            relative
            flex flex-col items-center
            rounded-4xl
            border border-white/40
            bg-white/60
            px-10 py-9
            shadow-[0px_10px_40px_rgba(16,185,129,0.10)]
            backdrop-blur-xl
            "
        >

            {/* Logo */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-linear-to-br from-emerald-500 to-green-600 shadow-lg">

            {/* Pulse Ring */}
            <div className="absolute inset-0 animate-ping rounded-[28px] bg-emerald-400 opacity-20" />

            <GraduationCap className="relative z-10 h-10 w-10 text-white" />
            </div>

            {/* Spinner */}
            <div className="relative mt-8">

            <div className="h-14 w-14 rounded-full border-[3px] border-emerald-100" />

            <div
                className="
                absolute inset-0
                h-14 w-14
                animate-spin
                rounded-full
                border-[3px]
                border-transparent
                border-t-emerald-600
                border-r-green-500
                "
            />
            </div>

            {/* Text */}
            <h2 className="mt-7 text-2xl font-bold text-slate-800">
            Loading Portal
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            Preparing your school workspace...
            </p>

            {/* Loading Dots */}
            <div className="mt-5 flex items-center gap-2">

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500" />
            </div>
        </div>
        </div>
    );
};

export default AppLoader;