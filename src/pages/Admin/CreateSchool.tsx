export default function CreateSchool() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center w-full max-w-md px-4">
            {/* Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome, create your school account
            </h1>

            <p className="text-gray-500 mb-10">
            It is our great pleasure to have <br /> you on board!
            </p>

            {/* Form */}
            <div className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Enter the name of admin"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
            />

            <input
                type="text"
                placeholder="Enter the name of school"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
            />

            <input
                type="email"
                placeholder="Enter the school email"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
            />
            </div>

            {/* Button */}
            <button className="w-full mt-6 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition">
            Next
            </button>

            {/* Bottom link */}
            <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 font-medium cursor-pointer">
                Sign up
            </a>
            </p>
        </div>
        </div>
  );
}
