import { AddressRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IAddress } from '@/interfaces/IRegister';
import { Roles } from '@/constants/role.enum';

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

  static async get(role:string=Roles.School,id: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${AddressRoute.get}/${id}`,
      payload: null,
      headers: { role: role },
    };

    return await handleApi<null, IAddress>(config);
  }

  static async update(role:string=Roles.School,id: string, form: IAddress) {
    const config: HandleApiOptions<IAddress> = {
      method: 'patch',
      endPoint: `${AddressRoute.edit}/${id}`,
      payload: form,
      headers: { role: role },
    };

    return await handleApi<IAddress, IAddress>(config);
  }
}
