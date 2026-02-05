export interface IFormdata {
    name: string | null;
    email: string | null;
    password: string | null;
    reEnter: string | null;
    profile: string | null;

    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    phone: string | null;
}


/** 
 * Document
 */
export interface IUploadedDoc {
    url: string;
    fileName: string;
}

export interface IDocument {
    tenantId?: string;
    userId?: string;
    role?: string|null;
    docs: IUploadedDoc[];
}


/**
 * Address
 */
export interface IAddress{
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    _id?:string|null;
    userId?:string|null;
    userType?:string|null;
}


/**
 * SchoolMeta
 */
export interface ISchoolFormData{
    adminName:string|null,
    schoolName:string|null
    email: string | null;
    password: string | null;
    reEnter: string | null;
    phone: string | null;
    profile: string | null;
}