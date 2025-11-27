import React from "react";
import { motion,easeInOut } from "framer-motion";
import { BookOpen, BarChart3, Bell, Shield, Calendar, UserCircle } from "lucide-react";

const features = [
    {
        title: "Student Management",
        description:
        "Easily manage student profiles, enrollment, and academic records in one centralized system.",
        icon: <UserCircle size={28} className="text-green-600" />,
    },
    {
        title: "Course Tracking",
        description:
        "Monitor course progress, assignments, and grades with real-time updates and insights.",
        icon: <BookOpen size={28} className="text-green-600" />,
    },
    {
        title: "Performance Analytics",
        description:
        "Access detailed analytics and reports to track student performance and identify areas for improvement.",
        icon: <BarChart3 size={28} className="text-green-600" />,
    },
    {
        title: "Smart Notifications",
        description:
        "Keep everyone informed with automated notifications for assignments, grades, and important updates.",
        icon: <Bell size={28} className="text-green-600" />,
    },
    {
        title: "Schedule Management",
        description:
        "Organize classes, exams, and events with an intuitive calendar system that syncs across devices.",
        icon: <Calendar size={28} className="text-green-600" />,
    },
    {
        title: "Secure & Private",
        description:
        "Enterprise-grade security ensures student data is protected with encryption and role-based access.",
        icon: <Shield size={28} className="text-green-600" />,
    },
    ];

    // Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease:easeInOut },
    },
};


    const FeaturesSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
            
            {/* Heading */}
            <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
            >
            Everything You Need
            </motion.h2>

            <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
            Comprehensive tools designed to simplify student management and enhance
            the learning experience.
            </motion.p>

            {/* Cards Grid */}
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {features.map((feature, index) => (
                <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition"
                >
                <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
                    {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {feature.description}
                </p>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
};

export default FeaturesSection;








































// import { Users, BookOpen, BarChart3, Bell, Calendar, Shield } from "lucide-react";

// const features = [
//     {
//         icon: Users,
//         title: "Student Management",
//         description: "Easily manage student profiles, enrollment, and academic records in one centralized system.",
//     },
//     {
//         icon: BookOpen,
//         title: "Course Tracking",
//         description: "Monitor course progress, assignments, and grades with real-time updates and insights.",
//     },
//     {
//         icon: BarChart3,
//         title: "Performance Analytics",
//         description: "Access detailed analytics and reports to track student performance and identify areas for improvement.",
//     },
//     {
//         icon: Bell,
//         title: "Smart Notifications",
//         description: "Keep everyone informed with automated notifications for assignments, grades, and important updates.",
//     },
//     {
//         icon: Calendar,
//         title: "Schedule Management",
//         description: "Organize classes, exams, and events with an intuitive calendar system that syncs across devices.",
//     },
//     {
//         icon: Shield,
//         title: "Secure & Private",
//         description: "Enterprise-grade security ensures student data is protected with encryption and role-based access.",
//     },
// ];

// const Features = () => {
//     return (
//         <section className="py-24 bg-background">
//         <div className="container mx-auto px-6">
//             <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//                 Everything You Need
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                 Comprehensive tools designed to simplify student management and enhance the learning experience.
//             </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//                 <Card 
//                 key={index} 
//                 className="border-border hover:shadow-lg transition-shadow duration-300 hover:border-primary/50"
//                 >
//                 <CardHeader>
//                     <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
//                     <feature.icon className="w-6 h-6 text-primary" />
//                     </div>
//                     <CardTitle className="text-xl">{feature.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <CardDescription className="text-base">
//                     {feature.description}
//                     </CardDescription>
//                 </CardContent>
//                 </Card>
//             ))}
//             </div>
//         </div>
//         </section>
//     );
// };

// export default Features;
