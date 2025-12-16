import { ZodSchema, ZodIssue } from "zod";

export const handleValidationOF = <T extends Record<string, unknown>>(
    schema: ZodSchema<T>,
    formData: T
) => {
        const result = schema.safeParse(formData);

        if (!result.success) {
            const issues: ZodIssue[] = result.error.issues; 
            
            issues.forEach((issue) => {
                const fieldName = issue.path[0]?.toString();
                const spanTag = document.getElementById(fieldName);

                if (spanTag) {
                    spanTag.textContent = issue.message;
                }
            });
        }

        return result;
};


/* 
validation error
expecting string got undefined

backend validation
*/
