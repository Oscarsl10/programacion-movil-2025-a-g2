import { BaseService } from './BaseService';  // Asegúrate de que esta ruta sea correcta
import { User } from '../interfaces/User';

export class UserService extends BaseService<User> {
  constructor() {
    super('v1/user');
  }
}