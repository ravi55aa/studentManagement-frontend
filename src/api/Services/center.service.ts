import { CenterRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';

import { ICenter } from '@/interfaces/ICenter';
import { IAddress } from '@/interfaces/IRegister';
import { ICenterForm } from '@/pages/School/Center/CenterAdd.page';
import { ICenterForm as IPCenterForm } from '@/interfaces/ISchool';

export class CenterService {
  static async create(form: ICenterForm) {
    const config: HandleApiOptions<ICenterForm> = {
      method: 'post',
      endPoint: CenterRoute.add,
      payload: form,
      headers: { role: 'School' },
    };

    return await handleApi<ICenterForm, ICenter>(config);
  }

  static async getAll() {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: CenterRoute.get,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, ICenter[]>(config);
  }

  static async get(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${CenterRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, ICenterForm>(config);
  }

  static async update(id: string, form: IPCenterForm) {
    const config: HandleApiOptions<IPCenterForm> = {
      method: 'put',
      endPoint: `${CenterRoute.edit}/${id}`,
      payload: form,
      headers: { role: 'School' },
    };

    return await handleApi<IPCenterForm, ICenter>(config);
  }

  static async delete(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'delete',
      endPoint: `${CenterRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, { message: string }>(config);
  }

  static async addAddress(id: string, addressForm: IAddress) {
    const config: HandleApiOptions<IAddress> = {
      method: 'post',
      endPoint: `${CenterRoute.addAddress}/${id}`,
      payload: addressForm,
      headers: { role: 'School' },
    };

    return await handleApi<IAddress, ICenter>(config);
  }
}
