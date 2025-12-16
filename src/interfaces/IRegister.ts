export interface IFormdata {
    name: string | null;
    email: string | null;
    password: string | null;
    reEnter: string | null;
    profile: File | null;

    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    phone: string | null;
}


export interface IAddress{
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
}


export interface ISchoolFormData{
    adminName:string|null,
    schoolName:string|null
    email: string | null;
    password: string | null;
    reEnter: string | null;
    phone: string | null;
    profile: File | null;
}