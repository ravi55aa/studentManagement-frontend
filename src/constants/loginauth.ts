import { returnErrorObj } from '@/api/school.api';
import { axiosBaseURL } from '@/config/axios.config';
import { AdminRouter, SchoolRoute } from '@/constants/routes.contants';
import { IAddress } from '@/interfaces/IRegister';
import { IResponse } from '@/interfaces/IResponse';

export const handleAdminRegister = async (payload: FormData) => {
    try {
        const { data } = await axiosBaseURL.post(AdminRouter.register, payload, {
        headers: {
            role: 'Admin',
        },
        });

        return { success: true, data };
    } catch (error) {
        console.error('Register error:', error.response?.data || error.message);

        return {
        success: false,
        error: error.response?.data || error.message,
        };
    }
};

export const handleAdminSignIn = async (payload: object,role:string='Admin',) => {
    try {
        const response = await axiosBaseURL.post(AdminRouter.login, payload, {
        headers: { role:role },
        });
        return { success: true, data: response?.data };
    } catch (error) {
        console.error('Register error:', error.response?.data || error.message);

        return {
        success: false,
        error: error.response?.data || error.message,
        };
    }
};


/****School auth****/
export const handleAddressCreateSchoolApi = async (
    formData: IAddress,
): Promise<IResponse<null>> => {
    try {
        const res: IResponse<null> = await axiosBaseURL.post(
        SchoolRoute.register_add_Address,
        formData,
        { headers: { role: 'Admin' } },
        );

        return res.data;
    } catch (err) {
        console.error(err, { cause: err.message });

        return returnErrorObj(err);
    }
};

export const handleDocsUploadCreateSchoolApi = async (formData): Promise<IResponse<null>> => {
    try {
        const res: IResponse<null> = await axiosBaseURL.post(
        SchoolRoute.register__add_documents,
        formData,
        { headers: { role: 'Admin', 'Content-Type': 'multipart/formData' } },
        );

        return res.data;
    } catch (err) {
        console.error(err, { cause: err.message });

        return returnErrorObj(err);
    }
};

export const handleSchoolSignIn = async (payload: object) => {
    try {
        const response = await axiosBaseURL.get(SchoolRoute.login, {
        params: payload,
        headers: { role: 'Admin' },
        });

        return { success: true, data: response?.data };
    } catch (error) {
        console.error('SignIn error:', error.response?.data || error.message);

        return {
        success: false,
        error: error.response?.data || error.message,
        };
    }
};
