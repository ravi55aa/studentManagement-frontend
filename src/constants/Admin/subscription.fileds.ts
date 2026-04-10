export const subscriptionPlanFields = [
    { name: 'name', label: 'Plan Name', type: 'text', placeholder: 'Enter plan name' },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },

    { name: 'amount', label: 'Amount', type: 'number', placeholder: 'Enter amount' },
    { name: 'discount', label: 'Discount (%)', type: 'number', placeholder: 'Enter discount %' },
    {
        name: 'discountAmount',
        label: 'Discount Amount',
        type: 'number',
        placeholder: 'Enter discount amount',
    },
    {
        name: 'finalAmount',
        label: 'Final Amount',
        type: 'number',
        placeholder: 'Auto calculated / Enter manually',
    },

    { name: 'duration', label: 'Duration (days)', type: 'number', placeholder: '30 / 90 / 365' },

    { name: 'maxStudents', label: 'Max Students', type: 'number', placeholder: 'Enter limit' },
    { name: 'maxTeachers', label: 'Max Teachers', type: 'number', placeholder: 'Enter limit' },
];
