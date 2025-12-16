import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
    const navigate=useNavigate()

    return (
        <section className="w-full bg-gradient-to-r from-[#6EEB83] to-[#3ACB78] px-6 py-20">
        <div className="max-w-6xl mx-auto text-center text-white">

            {/* Heading */}
            <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
            Manage Your Students <br /> Effortlessly
            </motion.h1>

            {/* Subtitle */}
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90"
            >
            Streamline student management, track progress, and enhance
            communication between teachers, students, and parents in one
            powerful platform.
            </motion.p>
            

            {/* Buttons */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
            >
            {/* Animated button */}
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={():void|Promise<void>=>navigate("/register")}
                className="bg-[#1E9E3A] text-white font-semibold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
                Get Started →
            </motion.button>

            <motion.input
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                type="text"
                className="bg-white w-56 py-3 rounded-xl shadow-lg outline-none"
            />
            </motion.div>

            {/* Stats with stagger effect */}
            <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                transition: { staggerChildren: 0.25 }
                }
            }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
            >
            {/* Stat Item */}
            {[
                { number: "50K+", label: "Active Students" },
                { number: "5K+", label: "Teachers" },
                { number: "98%", label: "Satisfaction" }
            ].map((item, i) => (
                <motion.div
                key={i}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                >
                <h2 className="text-4xl font-bold">{item.number}</h2>
                <p className="opacity-80 mt-1">{item.label}</p>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
};

export default Hero;
