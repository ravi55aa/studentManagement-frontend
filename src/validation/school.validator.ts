
import * as z from "zod";




export const schoolMetaDataValidate = 
    z.object({
        adminName: z.string().min(2, "Name too short"),
        schoolName: z.string().min(2, "Name too short"),
        email: z.string().email("Invalid email"),
        password: z
            .string()
            .min(6, "Password must be 6+ characters")
            .max(8, "Password must not be greater tha 8 characters"),
        reEnter: z.string(),
        profile: z.any().optional(),
        phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10 digits number").optional()
    })
    .refine((data) => data.password === data.reEnter, {
        message: "Passwords do not match",
        path: ["reEnter"],
    });




export const schoolSignInSchema = 
    z.object({
        
        schoolName: z
            .string()
                .min(2, "Name too short"),
        
        password: z
            .string()
                .min(6, "Password must be 6+ characters")
                    .max(8, "Password must not be greater tha 8 characters")
    });




export const addressValidate =
    z.object({
        zip: z
            .string()
                .regex(/^[1-9][0-9]{5}$/, "Enter valid 6-digits ZIP code "),

        street: z
            .string()
                .min(3, "Street name must be at least 3 characters")
                .max(50, "Street name is too long"),

        city: z
            .string()
                .min(3, "City name must be at least 3 characters")
                .max(30, "City name is too long"),

        state: z
            .string()
                .min(3, "State name must be at least 3 characters")
                .max(20, "State name is too long"),

        country: z
            .string()
                .min(3, "Country name must be at least 3 characters")
                .max(20, "Country name is too long"),
    });




/**
 * Center 
 */
const emptyToUndefined = (v: unknown) =>
    typeof v === "string" && v.trim() === ""
    ? undefined
    : v;

export const centerSchema = z.object({
    name: z
        .string()
        .min(3, "Center name must be at least 3 characters")
        .max(100, "Center name is too long"),

    code: z
        .string()
        .min(2, "Center code must be at least 2 characters")
        .max(20, "Center code is too long")
        .regex(/^[A-Z0-9-_]+$/, "Code must be uppercase (A-Z, 0-9, -, _)"),

    phone: 
        z
        .string()
        .regex(/^[6-9]\d{9}$/, {
            message: "Phone number must be 10 digits and start with 6–9",
        })
    ,

    email: z
    .string({
        message: "Email is required",
    })
    .trim()
    .toLowerCase()
    .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email address"
    ),

    headInCharge: z
        .string({
        message: "Head in charge is required"
        })
        .min(1, "Head in charge cannot be empty"),

    currentStrength: z
        .string()
        .optional()
        ,

    totalCapacity: z.coerce
        .string({message:"Total capacity value is required"})
        .min(10, "Min capacity should be 10 ")
        .max(150, "Max applicable students 150, according to your subscription")
    ,

    isMain: z.boolean(),

    isActive: z.boolean(),
    })
    .refine(
    (data) =>
        !data.currentStrength ||
        !data.totalCapacity ||
        Number(data.currentStrength) <= Number(data.totalCapacity),
    {
        message: "Current strength cannot exceed total capacity",
        path: ["currentStrength"],
    }
);



/**
 * Batch
 */

export const batchSchema = z.object({
    name: z
        .string()
        .min(2, "Batch name must be at least 2 characters")
        .max(50, "Batch name is too long"),

    code: z
        .string()
        .min(1, "Batch code is required")
        .max(20, "Batch code is too long")
        .regex(/^[A-Z0-9-_]+$/, "Code must be uppercase (A-Z, 0-9, -, _)"),

    center: z
        .string()
        .min(1, "Center is required"),

    counselor: z
        .string()
        .optional(),

    startDate: z
        .string()
        .optional()
        .refine(
        (val) => !val || !Number.isNaN(Date.parse(val)),
        "Invalid start date"
        ),

    endDate: z
        .string()
        .optional()
        .refine(
        (val) => !val || !Number.isNaN(Date.parse(val)),
        "Invalid end date"
        ),

    isActive: z.boolean(),
    })
    .refine(
    (data) =>
        !data.startDate ||
        !data.endDate ||
        new Date(data.endDate) >= new Date(data.startDate),
    {
        message: "End date must be after start date",
        path: ["endDate"],
    }
);




/* ---------- School Academic Year ---------- */
const isValidDate = (value: string) =>
    !Number.isNaN(Date.parse(value));

export const schoolAcademicYearSchema = z
    .object({
        year: z
            .string()
            .regex(
                /^(\d{4})-(\d{2})$/,
                "Year must be in format YYYY-YY"
            )
            .refine((value) => {
                const [start, end] = value.split("-");
                return Number(end) === (Number(start.slice(2)) + 1);
            }, {
                message: "Academic year must be continuous (2025-26)"
            }).optional(),

        code: z
        .string()
        .min(2, "Code is required")
        .max(10, "Code is too long")
        .regex(
            /^[A-Z0-9]+$/,
            "Code must be uppercase letters or numbers"
        ),

        startDate: z
        .string()
        .refine(isValidDate, "Invalid start date"),

        endDate: z
        .string()
        .refine(isValidDate, "Invalid end date"),

        isActive: z.boolean().optional(),
    })
    .refine(
        (data) =>
        new Date(data.endDate) > new Date(data.startDate),
        {
        message: "End date must be after start date",
        path: ["endDate"],
        }
    );



/* ---------- School Subject ---------- */

export const schoolSubjectSchema = z
    .object({
        name: z
        .string()
        .min(3, "Subject name must be at least 3 characters"),

        code: z
        .string()
        .min(2, "Code is required")
        .regex(/^[A-Z0-9-_]+$/, "Code must be uppercase"),

        className: z
        .string()
        .min(1,"Class is required")
        ,

        type: z.enum(["theory", "practical", "both"], {
        message: "Subject type is required"}),

        maxMarks: z
        .preprocess(
            emptyToUndefined, 
            z.number()
            .min(1, "Max marks must be greater than 0")
            .max(120,"Enter a valid Passing marks  default ^ 120")
        ),

        passMarks: 
            z.number()
            .min(10, "Pass marks must be grater than 10")
            .max(120,"Enter a valid Passing marks  default ^ 120")
            .optional()
        ,

        credits: z
        .preprocess(
            emptyToUndefined,
            z.number().min(0, "Credits cannot be negative").optional()
        ),

        department: z
        .string()
        .min(3,"Enter a valid Department")
        .max(20,"Department name cannot exceed 20 chars")
        .optional(),

        // level: z
        // .enum(
        //     ["primary", "secondary", "higher-secondary", "degree"],
        //     {message: "Invalid level" }
        // )
        // .optional(),

        academicYear: z
        .string()
        .min(1, "Academic year is required"),

        batchesToFollow: z
        .array(z.string())
        .min(1, "Select at least one batch"),

        description: z
        .string()
        .min(3,"Description is required min of 10 words"),

        referenceBooks: z
        .array(
            z
            .instanceof(File)
            .refine(
                (file) => file.size <= 5 * 1024 * 1024,
                "File size must be under 5MB"
            )
        )
        .optional()
    })
    .refine(
        (data) =>
        data.passMarks === undefined ||
        data.passMarks <= data.maxMarks,
        {
        message: "Pass marks cannot exceed max marks",
        path: ["passMarks"],
        }
    );



/************ ACADEMIC Course ************/

    /* ---------- schema ---------- */
export const courseValSchema = z.object({
    /* ---------- core ---------- */
    name: z
        .string()
        .min(3, "Course name must be at least 3 characters"),

    code: z
        .string()
        .min(2, "Course code is required")
        .regex(/^[A-Z0-9-_]+$/, "Code must be uppercase"),

    academicYear: z
        .string("Academic Year is required else Default will be taken"),

    // level: z
    //     .string()
    //     .min(1, "Course level is required"),

    description: z
        .string()
        .min(5, "Description must be at least 5 characters")
        .max(150, "Description must be at max of 150 characters")
        ,

    status: z.enum(["active", "inactive"]),

    /* ---------- duration ---------- */
    duration: z.object({
        value: z.coerce
            .number({
                message: "Duration value is required"
            })
            .int("Duration must be a whole number")
            .positive("Duration must be greater than 0"),


        unit: z.enum(["hours", "months", "years"], {
            message: "Duration unit is required"
        })
        }),


    /* ---------- schedule ---------- */
    schedule: z.object({
        startDate: z.string("Start Date is required"),
        endDate: z.string("End Date is required"),
    }),

    /* ---------- capacity ---------- */
    maxStudents: z
        .coerce
        .number()
        .min(10,"Min required students were 10")
        .max(150,"Max allowed students is 150")
    ,

    enrollmentOpen: z.boolean(),

    /* ---------- relations ---------- */
    subjects: z
        .array(z.string())
        .min(1, "Select at least one subject"),

    batches: z
        .array(z.string())
        .min(1, "Select at least one batch"),

    coordinators: z
        .array(z.string())
        .optional(),

    /* ---------- meta ---------- */
    eligibilityCriteria: z
        .string()
        .optional()
        .or(z.literal("")),

    syllabusUrl: z
        .string()
        .url("Invalid syllabus URL")
        .optional()
        .or(z.literal("")),

    attachments: z
    .array(
        z
        .instanceof(File)
        .optional()
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
            "File size must be under 5MB"
        )
    )
    .optional(),
}).refine(
    (data) =>
        !data.schedule.startDate ||
        !data.schedule.endDate ||
        new Date(data.schedule.startDate) <=
        new Date(data.schedule.endDate),
    {
        message: "End date must be after start date",
        path: ["schedule", "endDate"],
    }
);
export type courseFormSchema = z.infer<typeof courseValSchema>;



export const passwordSchema = z
    .object({
        pass1: z
        .string()
        .min(6, "Password must be at least 6 characters"),
        pass2: z
        .string()
        .min(6, "Confirm password is required"),
    })
    .refine((data) => data.pass1 === data.pass2, {
        message: "Passwords do not match",
        path: ["password2"], // 👈 error shown under confirm password
    });
        