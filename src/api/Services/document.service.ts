import { DocumentRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IDocument } from '@/interfaces/IRegister';
import { Roles } from '@/constants/role.enum';
import { BaseService } from './Base.Service';

export class DocumentService extends BaseService {

  static getAll() {
    return this.get<IDocument[]>(
      DocumentRoute.document
    );
  }

  static getById(id: string) {
    return this.get<IDocument>(
      `${DocumentRoute.document}/${id}`
    );
  }

  static create(userId: string, formData: FormData) {
    return this.put<FormData, IDocument>(
      `${DocumentRoute.document}/${userId}`,
      formData
    );
  }

  static update(userId: string, formData: Partial<IDocument>) {
    return this.put<Partial<IDocument>, IDocument>(
      `${DocumentRoute.document}/${userId}`,
      formData
    );
  }

  static deleteDocument(id: string, fileName: string) {
    return this.delete<null>(
      `${DocumentRoute.document}/${id}`,
      { file_Name: fileName }
    );
  }
}