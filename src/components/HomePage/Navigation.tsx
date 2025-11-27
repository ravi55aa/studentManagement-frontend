import React from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-scroll";


const Navbar: React.FC = () => {
    const navigate=useNavigate();
    return (
        <nav className="w-full bg-[#6EEB83] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <h1 className="text-white font-bold text-2xl">MyEdu</h1>

            {/* Menu */}
            <ul className="hidden md:flex gap-10 text-white font-semibold">
                <li className="cursor-pointer hover:opacity-80">
                    <Link to="hero" smooth={true} duration={600}>Home</Link>
                </li>
                <li className="cursor-pointer hover:opacity-80">
                    <Link to="feature" smooth={true} duration={600}>Features</Link>
                </li>
                <li className="cursor-pointer hover:opacity-80">
                    <Link to="pricing" smooth={true} duration={600}> Pricing</Link>
                </li>
                <li className="cursor-pointer hover:opacity-80">
                    <Link to="footer" smooth={true} duration={600}>About</Link>
                </li>
            </ul>

            {/* Login Button */}
            <button 
            type="button"
            onClick={()=>navigate("/login")}
            className="bg-[#1E9E3A] text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90">
            signIn | signup
            </button>
        </div>
        </nav>
    );
};

export default Navbar;

