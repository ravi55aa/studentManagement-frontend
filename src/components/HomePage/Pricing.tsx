import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        monthly: "",
        description: "Perfect for small schools and tutoring centers",
        features: [
        "Up to 100 students",
        "Basic reporting",
        "Email support",
        "Mobile app access",
        "5GB storage"
        ],
        buttonColor: "bg-green-100 text-green-700",
        popular: false
    },
    {
        name: "Professional",
        price: "$79",
        monthly: "/month",
        description: "Ideal for growing educational institutions",
        features: [
        "Up to 500 students",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "50GB storage",
        "Parent portal"
        ],
        buttonColor: "bg-green-600 text-white",
        popular: true
    },
    {
        name: "Enterprise",
        price: "$199",
        monthly: "/month",
        description: "For large schools and districts",
        features: [
        "Unlimited students",
        "Custom reporting",
        "24/7 dedicated support",
        "API access",
        "Unlimited storage",
        "Advanced security",
        "Training sessions"
        ],
        buttonColor: "bg-green-100 text-green-700",
        popular: false
    }
];

// Animations
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
    }
};

const PricingSection: React.FC = () => {
    return (
        <section className="w-full bg-[#F5FFF8] px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
            
            {/* Heading */}
            <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
            >
            Choose Your Plan
            </motion.h2>

            {/* Subtitle */}
            <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
            Flexible pricing options designed to scale with your institution's needs.
            </motion.p>

            {/* Pricing Cards */}
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10"
            >
            {pricingPlans.map((plan, index) => (
                <motion.div
                key={index}
                variants={cardVariants}
                className={`relative bg-white rounded-2xl shadow-md border p-8 text-center hover:shadow-lg transition ${
                    plan.popular ? "border-green-600 shadow-xl scale-105" : ""
                }`}
                >
                {/* Badge */}
                {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                    </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-semibold">{plan.name}</h3>

                {/* Price */}
                <p className="text-5xl font-bold mt-4">
                    {plan.price}
                    <span className="text-xl font-medium text-gray-500">{plan.monthly}</span>
                </p>

                {/* Description */}
                <p className="text-gray-600 mt-2">{plan.description}</p>

                {/* Features */}
                <ul className="text-left mt-6 space-y-3">
                    {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle size={20} className="text-green-600" />
                        {f}
                    </li>
                    ))}
                </ul>

                {/* Button */}
                <button
                    className={`${plan.buttonColor} 
                    ${index!==0 ?"cursor-not-allowed" :"cursor-pointer"}
                    mt-8 w-full py-3 rounded-xl font-semibold`}
                >
                    {index!=0?"NA":"Get Started"}
                </button>
                </motion.div>
            ))}
            </motion.div>

        </div>
        </section>
    );
};

export default PricingSection;
