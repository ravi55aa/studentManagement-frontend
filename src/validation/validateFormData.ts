import { ZodSchema, ZodIssue } from "zod";

export const handleValidationOF = <T extends object>(
    schema: ZodSchema<T>,
    formData: T
) => {
        const result = schema.safeParse(formData);

        if (!result.success) {
            const issues: ZodIssue[] = result.error.issues; 

            console.log("issues",issues);
            
            issues.forEach((issue) => {
                const fieldName = issue.path.join(" ");
                console.log("The fieldName",fieldName);   

                // if(issue.path.length>1){
                //     fieldName=issue.path.join(",")[0]?.toString();
                // }

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
