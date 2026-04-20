import { IOtp } from '@/pages/Auth/ForgotPassword/Otp.page';
import { HandleApiOptions, handleApi } from '../global.api';
import { forgotPassword } from '@/constants/routes.contants';
import { BaseService } from './Base.Service';

export class AuthService extends BaseService {

  static verifyEmail(email: string, role: string) {
    return this.post<{ email: string; model: string }, { id: string }>(
      forgotPassword.emailVerify,
      { email, model: role }
    );
  }

  static generateOtp(id: string) {
    return this.get<IOtp>(
      `${forgotPassword.generateOtp}/${id}`
    );
  }

  static verifyOtp(genOtp: string, formOtp: string, id: string) {
    return this.post<
      { generatedOtp: string; userEnteredOtp: string },
      unknown
    >(
      `${forgotPassword.verifyOtp}/${id}`,
      { generatedOtp: genOtp, userEnteredOtp: formOtp }
    );
  }

  static updatePassword(id: string, newPassword: string) {
    return this.patch<
      { newPassword: string; modelName: string },
      unknown
    >(
      `${forgotPassword.updatePassword}/${id}`,
      { newPassword, modelName: 'Admin' }
    );
  }
}