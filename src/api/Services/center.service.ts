import { CenterRoute } from '@/constants/routes.contants';

import { ICenter } from '@/interfaces/ICenter';
import { IAddress } from '@/interfaces/IRegister';
import { ICenterForm } from '@/pages/School/Center/CenterAdd.page';
import { ICenterForm as IPCenterForm } from '@/interfaces/ISchool';
import { BaseService } from './Base.Service';

export class CenterService extends BaseService {

  static create(form: ICenterForm) {
    return this.post<ICenterForm, ICenter>(
      CenterRoute.add,
      form
    );
  }

  static getAll() {
    return this.get<ICenter[]>(
      CenterRoute.get
    );
  }

  static getById(id: string) {
    return this.get<ICenterForm>(
      `${CenterRoute.get}/${id}`
    );
  }

  static update(id: string, form: IPCenterForm) {
    return this.put<IPCenterForm, ICenter>(
      `${CenterRoute.edit}/${id}`,
      form
    );
  }

  static deleteCenter(id: string) {
    return this.delete<{ message: string }>(
      `${CenterRoute.get}/${id}`
    );
  }

  static addAddress(id: string, addressForm: IAddress) {
    return this.post<IAddress, ICenter>(
      `${CenterRoute.addAddress}/${id}`,
      addressForm
    );
  }
}