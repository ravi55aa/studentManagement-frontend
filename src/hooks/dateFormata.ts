export const _useFormatDateForInput = (isoDate: string):string => {
        if(!isoDate) return "2025";
        return new Date(isoDate)?.toISOString()?.split("T")[0];
    };    
