import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be 6+ characters").max(8,"Password must not be greater tha 8 characters"),
    reEnter: z.string(),
    profilePic: z.any().optional()
    }).refine((data) => data.password === data.reEnter, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});