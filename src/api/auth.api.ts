import { axiosBaseURL } from '@/config/axios.config';
import { AdminRouter } from '@/constants/routes.contants';

export const handleAdminRegister = async (payload: FormData) => {
  try {
    const { data } = await axiosBaseURL.post(AdminRouter.register, payload);

    return { success: true, data };
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const handleAdminSignIn = async (payload: object) => {
  try {
    const response = await axiosBaseURL.post(AdminRouter.login, payload);
    return { success: true, data: response?.data };
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
