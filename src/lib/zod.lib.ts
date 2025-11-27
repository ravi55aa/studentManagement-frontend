import * as z from "zod";

export const Player=z.object({
    name:z.string().min(3).max(20),
    email:z.string().endsWith("@gmail.com"),
    password:z.string().min(6).max(8).check
});

