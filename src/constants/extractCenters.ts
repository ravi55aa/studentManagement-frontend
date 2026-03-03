import { ICenter } from "@/interfaces/ICenter";

export const extractCenters=(centers:ICenter[])=>{
    return centers.map((center:ICenter)=>{
        return {label:center.name,value:center.code};
    })
}