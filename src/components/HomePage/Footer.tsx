import React from "react";

const Footer
: React.FC = () => {
    return (
        <footer className="w-full bg-[#119E43] text-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand Section */}
            <div>
            <h2 className="text-2xl font-bold">EduManage</h2>
            <p className="mt-4 text-white/80 max-w-xs">
                Empowering educational institutions with powerful student management tools.
            </p>
            </div>

            {/* Product Links */}
            <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-white/90">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Integrations</li>
            </ul>
            </div>

            {/* Company Links */}
            <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-white/90">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
            </div>

            {/* Newsletter */}
            <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/90 mb-4 max-w-xs">
                Get the latest updates and news delivered to your inbox.
            </p>

            <div className="flex items-center gap-2">
                <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none w-full"
                />
                <button className="text-white font-semibold hover:underline">
                Subscribe
                </button>
            </div>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between text-white/80 text-sm">
            
            <p>© 2025 EduManage. All rights reserved.</p>

            <div className="flex items-center gap-6 mt-4 md:mt-0">
            <p className="hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer">Terms of Service</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer
;
