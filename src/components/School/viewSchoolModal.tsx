import {
    School2,
    User2,
    Mail,
    Phone,
    MapPin,
    FileText,
    X,
    Building2,
} from "lucide-react";

import { IUploadedDoc } from "@/interfaces/IRegister";
import { useState } from "react";

import PreviewModal from "../PreviewModa";

export const SchoolViewModal = ({
    viewSchool,
    isModalOpen,
    onClose,
    }) => {

    if (!isModalOpen || !viewSchool) return null;

    const {
        meta,
        address,
        documents,
    } = viewSchool;

    const [utils, setUtils] = useState({
        selectedUrl: "",
        isOpen: false,
    });

    return (
        <>
        {/* ---------- Overlay ---------- */}
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

            {/* ---------- Modal ---------- */}
            <div className="w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl border border-slate-200">

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

                {/* Top Content */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                {/* Logo */}
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
                    <School2 className="w-12 h-12" />
                </div>

                {/* School Details */}
                <div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
                    Registered School
                    </div>

                    <h1 className="mt-4 text-3xl font-bold text-slate-800">
                    {meta?.schoolName || "School Name"}
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Complete school information including administration,
                    contact details, location and uploaded documents.
                    </p>
                </div>
                </div>
            </div>

            {/* ---------- Body ---------- */}
            <div className="max-h-[78vh] overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/40">

                {/* ---------- School Info ---------- */}
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <Building2 className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        School Information
                    </h2>

                    <p className="text-sm text-slate-500">
                        Administrative details of the school
                    </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* School */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <School2 className="w-5 h-5 text-emerald-700" />
                        </div>

                        <div>
                        <p className="text-sm text-slate-500">
                            School Name
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                            {meta?.schoolName || "Not Available"}
                        </h3>
                        </div>
                    </div>
                    </div>

                    {/* Admin */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <User2 className="w-5 h-5 text-emerald-700" />
                        </div>

                        <div>
                        <p className="text-sm text-slate-500">
                            Administrator
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                            {meta?.adminName || "Not Available"}
                        </h3>
                        </div>
                    </div>
                    </div>

                    {/* Email */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <Mail className="w-5 h-5 text-emerald-700" />
                        </div>

                        <div>
                        <p className="text-sm text-slate-500">
                            Email Address
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800 break-all">
                            {meta?.email || "Not Available"}
                        </h3>
                        </div>
                    </div>
                    </div>

                    {/* Phone */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                        <Phone className="w-5 h-5 text-emerald-700" />
                        </div>

                        <div>
                        <p className="text-sm text-slate-500">
                            Phone Number
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                            {meta?.phone || "Not Available"}
                        </h3>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* ---------- Address ---------- */}
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Address Information
                    </h2>

                    <p className="text-sm text-slate-500">
                        School location and address details
                    </p>
                    </div>
                </div>

                {address ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {[
                        {
                        label: "Street",
                        value: address?.street,
                        },
                        {
                        label: "City",
                        value: address?.city,
                        },
                        {
                        label: "State",
                        value: address?.state,
                        },
                        {
                        label: "ZIP Code",
                        value: address?.zip,
                        },
                        {
                        label: "Country",
                        value: address?.country,
                        },
                    ].map((item, index) => (

                        <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                        >
                        <p className="text-sm text-slate-500">
                            {item.label}
                        </p>

                        <h3 className="mt-1 font-semibold text-slate-800">
                            {item.value || "Not Available"}
                        </h3>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
                    No Address Information Available
                    </div>
                )}
                </div>

                {/* ---------- Documents ---------- */}
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <FileText className="w-5 h-5 text-emerald-700" />
                    </div>

                    <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Uploaded Documents
                    </h2>

                    <p className="text-sm text-slate-500">
                        School verification and uploaded files
                    </p>
                    </div>
                </div>

                {documents?.docs?.length > 0 ? (

                    <div className="space-y-3">

                    {documents.docs.map(
                        (doc: IUploadedDoc, index: number) => (

                        <button
                            key={index}
                            type="button"
                            onClick={() =>
                            setUtils({
                                selectedUrl: doc.url,
                                isOpen: true,
                            })
                            }
                            className="
                            flex w-full items-center justify-between
                            rounded-2xl border border-slate-200
                            bg-slate-50/70 px-5 py-4
                            text-left transition-all duration-200
                            hover:bg-emerald-50 hover:border-emerald-200
                            "
                        >

                            <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                                <FileText className="w-5 h-5 text-emerald-700" />
                            </div>

                            <div>
                                <p className="font-medium text-slate-700">
                                {doc?.fileName}
                                </p>

                                <p className="text-sm text-slate-400">
                                Click to preview document
                                </p>
                            </div>
                            </div>

                            <span className="text-sm font-medium text-emerald-700">
                            View
                            </span>
                        </button>
                        )
                    )}
                    </div>
                ) : (

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
                    No Documents Uploaded
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>

        {/* ---------- Preview ---------- */}
        <PreviewModal
            isOpen={utils.isOpen}
            onClose={() =>
            setUtils({
                isOpen: false,
                selectedUrl: "",
            })
            }
            url={utils.selectedUrl}
        />
        </>
    );
};