import { AddressRoute } from '@/constants/routes.contants';
import { IAddress } from '@/interfaces/IRegister';
import { BaseService } from './Base.Service';

export class AddressService extends BaseService {

  // Get All Addresses
  static getAll() {
    return this.get<IAddress[]>(
      AddressRoute.getAll
    );
  }

  // Get Single Address
  static getAAddress(id: string) {
    return this.get<IAddress>(
      `${AddressRoute.get}/${id}`
    );
  }

  // Update Address
  static update(id: string, form: IAddress) {
    return this.patch<IAddress, IAddress>(
      `${AddressRoute.edit}/${id}`,
      form
    );
  }
}