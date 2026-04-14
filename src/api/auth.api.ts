import { axiosBaseURL } from '@/config/axios.config';
import { AdminRouter } from '@/constants/routes.contants';

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
