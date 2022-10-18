import { Service } from './service.model';
import { User } from './user.model';

export interface AppStore {
  user: User;
  service: Service;
  services: Service[];
}
