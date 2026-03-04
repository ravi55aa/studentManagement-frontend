import { AddressRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IAddress } from '@/interfaces/IRegister';

export class AddressService {
  static async getAll() {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: AddressRoute.getAll,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, IAddress[]>(config);
  }

  static async get(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${AddressRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, IAddress>(config);
  }

  static async update(id: string, form: IAddress) {
    const config: HandleApiOptions<IAddress> = {
      method: 'patch',
      endPoint: `${AddressRoute.edit}/${id}`,
      payload: form,
      headers: { role: 'School' },
    };

    return await handleApi<IAddress, IAddress>(config);
  }
}
