export const inputStyle="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-green-600 outline-none"

export const fields = [
    {
        name: "adminName",
        placeholder: "Enter the name of Admin",
        type: "text",
    },
    {
        name: "schoolName",
        placeholder: "Enter the name of school",
        type: "text",
    },
    {
        name: "email",
        placeholder: "Enter the school email",
        type: "email",
    },
    {
        name: "password",
        placeholder: "Enter Password",
        type: "password",
    },
    {
        name: "reEnter",
        placeholder: "Confirm Password",
        type: "password",
    },
    {
        name: "phone",
        placeholder: "Enter phone number",
        type: "text",
    },
];




export const inputStyleRegisterSchoolAddress="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full";


export const school_Register_SchemaFor_Address=[
    {
        name: "street",
        placeholder: "Enter the street",
        type: "text",
    },
    {
        name: "city",
        placeholder: "Enter the city ",
        type: "text",
    },
    {
        name: "state",
        placeholder: "Enter State",
        type: "text",
    },
    {
        name: "zip",
        placeholder: "Enter Zip",
        type: "text",
    },
    {
        name: "country",
        placeholder: "Enter Country",
        type: "text",
    },
]

export const school_LoginIn_Schema=[
    {
        name: "schoolName",
        placeholder: "Enter the school name",
        type: "text",
    },
    {
        name: "password",
        placeholder: "Enter the school password ",
        type: "password",
    },
]


export const addCenter_Form_Fields = [
    {
        name: "name",
        placeholder: "Enter center name",
        type: "text",
    },
    {
        name: "code",
        placeholder: "Enter center code (e.g. CAN-01)",
        type: "text",
    },
    {
        name: "phone",
        placeholder: "Enter phone number",
        type: "tel",
    },
    {
        name: "email",
        placeholder: "Enter email address",
        type: "email",
    },
    {
        name: "currentStrength",
        placeholder: "initially will be `0`,  value handled automatically ",
        type: "number",
        disabled:true,
    },//Current_strength is required because of 
    //to understand the no of students in a center
    {
        name: "totalCapacity",
        placeholder: "Enter total capacity",
        type: "string",
    },
];
