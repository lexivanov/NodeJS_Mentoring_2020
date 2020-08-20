import { IDataService } from '../data-access/types';
import { IUser } from '../types';

export class UserService {
  constructor(private readonly dataService: IDataService<IUser>) { }

  public getById(id: string) {
    return this.dataService.getById(id);
  }

  public get(substring?: string, limit?: number) {
    return this.dataService.get(substring, limit);
  }

  public create(userData: Omit<IUser, 'id'>) {
    return this.dataService.create(userData);
  }
  public delete(id: string) {
    return this.dataService.delete(id);
  }

  public update(userData: Omit<IUser, 'id'>, id: string) {
    return this.dataService.update(userData, id);
  };
}