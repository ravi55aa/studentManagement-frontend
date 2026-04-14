export const PlanViewModal = ({ plan, isOpen, onClose }) => {
    if (!isOpen || !plan) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white w-[500px] p-6 rounded-lg space-y-4">

            {/* META */}
            <div>
            <h2 className="font-bold text-lg">Plan Info</h2>
            <p>Name: {plan.name}</p>
            <p>Price: ₹{plan.finalAmount}</p>
            <p>Duration: {plan.duration} days</p>
            </div>

            {/* BENEFITS */}
            <div>
            <h2 className="font-bold text-lg">Benefits</h2>
            <ul className="list-disc ml-5">
                {plan.benefits.map((b, i) => (
                <li key={i}>{b}</li>
                ))}
            </ul>
            </div>

            {/* LIMITS */}
            <div>
            <h2 className="font-bold text-lg">Limits</h2>
            <p>Students: {plan.maxStudents || 'Unlimited'}</p>
            <p>Teachers: {plan.maxTeachers || 'Unlimited'}</p>
            </div>

            <button
            onClick={onClose}
            className="bg-green-700 text-white px-4 py-2 rounded"
            >
            Close
            </button>
        </div>
        </div>
    );
};