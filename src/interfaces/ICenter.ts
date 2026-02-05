export interface ICenter{
    name:string|null,
    code:string|null,
    phone: string | null;
    email: string | null;
    tenantId:unknown|null,
    adminId:unknown|null,
    headInCharge:unknown|null,
    currentStrength: number | null;
    totalCapacity: number | null;
    isMain: boolean | null;
    isActive: boolean | null;
    type: string | null;
    _id:string|null
}