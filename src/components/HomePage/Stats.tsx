import React from "react";
import { motion, Variants } from "framer-motion";
import { Users, GraduationCap, TrendingUp, Award } from "lucide-react";

// Data
const stats = [
    {
        icon: <Users size={28} className="text-green-600" />,
        value: "80,000+",
        label: "Active Users",
        description: "Teachers, students, and parents using our platform daily",
    },
    {
        icon: <GraduationCap size={28} className="text-green-600" />,
        value: "500+",
        label: "Institutions",
        description: "Schools and educational centers worldwide",
    },
    {
        icon: <TrendingUp size={28} className="text-green-600" />,
        value: "45%",
        label: "Efficiency Boost",
        description: "Average improvement in administrative tasks",
    },
    {
        icon: <Award size={28} className="text-green-600" />,
        value: "4.9/5",
        label: "User Rating",
        description: "Based on 10,000+ reviews from educators",
    },
];

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0], // TS-safe cubic easing
        },
    },
};

const StatsSection: React.FC = () => {
    return (
        <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
            
            {/* Heading */}
            <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
            >
            Trusted by Thousands
            </motion.h2>

            {/* Subtitle */}
            <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
            Join the growing community of educators who are transforming their institutions
            with EduManage.
            </motion.p>

            {/* Stats Cards */}
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
            {stats.map((item, index) => (
                <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-md border p-8 hover:shadow-lg transition text-center"
                >
                <div className="bg-green-100 w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4">
                    {item.icon}
                </div>

                <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>
                <p className="text-gray-700 font-semibold mt-1">{item.label}</p>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    {item.description}
                </p>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
};

export default StatsSection;
