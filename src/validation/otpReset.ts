import { z } from "zod";

export const otpVerificationSchema = z.object({
    otp: z
        .string()
            .length(6, "OTP must be 6 digits")
                .regex(/^\d+$/, "OTP must contain only numbers"),
});



export const emailVerificationSchema = z.object({
    email: z
        .string().email("Invalid email")
});
