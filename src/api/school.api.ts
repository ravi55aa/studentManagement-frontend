import { IAddress } from '@/interfaces/IRegister';
import { axiosBaseURL } from '@/config/axios.config';
import { IResponse } from '@/interfaces/IResponse';
import { SchoolRoute } from '@/constants/routes.contants';

export const returnErrorObj = (err) => {
  console.error(err, { cause: err.message });
  return {
    success: false,
    message: 'something',
    data: null,
    error: err,
  };
};

// export const handleMetaDataCreateSchoolApi =
//     async (formData:ISchoolFormData):Promise<IResponse<null>>=>
//         {
//         try {
//             const res:IResponse<null> =

//             return res.data;
//         } catch(err){
//             console.log("@school.api CatchBlock",'Somethig went error')
//             console.error(err,{cause:err.message});

//             return returnErrorObj(err);
//         }
//     }

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
