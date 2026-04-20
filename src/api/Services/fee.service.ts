import { FeeRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IFee } from '@/interfaces/IFee';
import { TPaginationQuery,TPaginationResult } from '@/types/paginationTypes';
import { BaseService } from './Base.Service';

export class FeeService extends BaseService {

  static create(form: object) {
    return this.post<object, IFee>(
      FeeRoute.add,
      form
    );
  }

  static getById(id: string) {
    return this.get<Partial<IFee>>(
      `${FeeRoute.get}/${id}`
    );
  }

  static getAll(paginationQuery: TPaginationQuery) {
    return this.get<TPaginationResult<IFee>>(
      FeeRoute.getAll,
      paginationQuery
    );
  }

  static update(id: string, form: object) {
    return this.patch<object, IFee>(
      `${FeeRoute.edit}/${id}`,
      form
    );
  }

  static deleteFee(id: string) {
    return this.delete<{ message: string }>(
      `${FeeRoute.delete}/${id}`
    );
  }
}