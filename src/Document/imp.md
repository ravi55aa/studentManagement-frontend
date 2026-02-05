
Q1
_______________________________________________-
    Eg: 

    Backend is sending the raw MongoDB error object instead of a clean response.

            {
            "success": false,
            "message": "E11000 duplicate key error ...",
            "error": {
                "code": 11000,
                "keyValue": {
                "tenantId": "...",
                "code": "AY25"
                }
            }
            }

    Ans:  👉 Frontend should NEVER receive MongoDB error structure
_______________________________________________-