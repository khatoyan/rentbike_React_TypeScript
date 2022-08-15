import { CatalogService } from './CatalogService';
import { PointService } from './PointService';
import {UserService} from './UserService'

class Api {
  public catalog: CatalogService = null;

  public point: PointService = null;

  public user: UserService = null;

  constructor() {
    this.catalog = new CatalogService();
    this.point = new PointService();
    this.user = new UserService();
  }
}

export const api = new Api();
